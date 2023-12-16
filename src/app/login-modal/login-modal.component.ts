// login-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {WebcamImage} from 'ngx-webcam';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  @Input() isModalOpen: boolean = false;
  @Input() isLogIn: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<{
    username: string;
    email: string;
  }>();
  username: string = '';
  email: string = '';
  imageUrl:string | undefined=''

  /**
   *
   */
  constructor(private sanitizer: DomSanitizer) {
    
  }

  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit(this.isModalOpen);
  }

  login() {
    console.log('log in pressed')
    console.log(this.username)
    console.log(this.email)
    //this.loginEvent.emit({ username: this.username, email: this.email });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  webcamImage:WebcamImage|undefined

  receivedBoolean: boolean= false;

  receiveBoolean(value: boolean): void {
    if(value==true){
      this.imageUrl=''
    }
    this.receivedBoolean = value;
  }

  handleImage(webcamImage:WebcamImage){
    console.log(webcamImage.imageAsDataUrl)
    console.log(webcamImage.imageAsBase64)
    

    this.imageUrl =`data:image/png;base64,${webcamImage.imageAsBase64}`// this.webcamImage?.imageAsDataUrl;
    this.sanitizer.bypassSecurityTrustUrl(this.imageUrl!);
    this.webcamImage=webcamImage
    console.log(this.webcamImage)
  }
}
