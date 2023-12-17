// login-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WebcamImage } from 'ngx-webcam';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceExtensionService } from '../services/authServiceExtension/auth-service-extension.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  errorMessaje: string = '';
  showError: boolean = false;
  @Input() isModalOpen: boolean = false;
  @Input() isSignUp: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<{
    username: string;
    email: string;
  }>();
  username: string = '';
  email: string = '';
  imageUrl: string | undefined = '';

  /**
   *
   */
  constructor(
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private authExtensionService: AuthServiceExtensionService
  ) {}

  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit(this.isModalOpen);
  }

  login() {
    this.errorMessaje = '';
    this.showError = false;
    if (this.imageUrl == undefined || this.imageUrl == '' || !this.imageUrl) {
      this.errorMessaje += ' Please insert an image!';
      this.showError = true;
    }

    if (this.isSignUp && (!this.email || !this.username)) {
      this.errorMessaje += ' Please insert email and username!';
      this.showError = true;
    }

    if (!this.isSignUp && !this.username) {
      this.errorMessaje += ' Please insert your username!';
      this.showError = true;
    }
    // const binaryData = this.decodeBase64(this.webcamImage!.imageAsBase64);
    // const blob = new Blob([binaryData], { type: 'image/jpg' });
    if (this.isSignUp && this.showError == false) {
      const binaryData = this.decodeBase64(this.webcamImage!.imageAsBase64);
      const blob = new Blob([binaryData], { type: 'image/jpg' });
      const file = new File([blob], 'image.jpg', { type: 'image/jpg' });
      this.spinner.show();
      this.authService.register(file, this.username, this.email).subscribe({
        next: (res) => {
          if (res.isSuccessful == true) {
            this.authExtensionService.login(file, this.username).subscribe({
              next: (res) => {
                if(res.isSuccessful){
                this.spinner.hide();
                  window.location.reload();
                }
              },
              error: (err) => {
                this.spinner.hide();
              },
            });
          }
          else{
            this.errorMessaje += res.errors[0];
            this.showError = true;
            this.spinner.hide();
          }
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
    }
    if (!this.isSignUp && this.showError == false) {
      const binaryData = this.decodeBase64(this.webcamImage!.imageAsBase64);
      const blob = new Blob([binaryData], { type: 'image/jpg' });
      const file = new File([blob], 'image.jpg', { type: 'image/jpg' });
      this.spinner.show();

      this.authExtensionService.login(file, this.username).subscribe({
        next: (res) => {
          if(res.isSuccessful){
            window.location.reload();
          }
          else{
            this.errorMessaje += res.errors[0];
            this.showError = true;
          }
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
    }
  }

  private decodeBase64(base64Data: string): Uint8Array {
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  webcamImage: WebcamImage | undefined;

  receivedBoolean: boolean = false;

  receiveBoolean(value: boolean): void {
    if (value == true) {
      this.imageUrl = '';
    }
    this.receivedBoolean = value;
  }

  handleImage(webcamImage: WebcamImage) {
    this.imageUrl = `data:image/png;base64,${webcamImage.imageAsBase64}`; // this.webcamImage?.imageAsDataUrl;
    this.sanitizer.bypassSecurityTrustUrl(this.imageUrl!);
    this.webcamImage = webcamImage;
  }
}
