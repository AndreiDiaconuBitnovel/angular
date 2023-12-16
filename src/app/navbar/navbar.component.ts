import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import {AuthServiceExtensionService} from '../services/authServiceExtension/auth-service-extension.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService,public authServiceExtension: AuthServiceExtensionService) {}

  @Output() loggedOut = new EventEmitter<boolean>();
  isLoginModalOpen: boolean = false;
  isLogIn: boolean = true;
  

  openLoginModal() {
    this.isLogIn=false;
    this.isLoginModalOpen = true;
  }

  closeModalHandler(isModalOpen: boolean) {
    this.isLoginModalOpen = isModalOpen;
  }

  onLogin(credentials: { username: string; email: string }) {
    // Handle login logic here
    console.log('Login successful', credentials);
    // Close the modal after handling login
    this.isLoginModalOpen = false;
  }

  onSignUpClick(): void {
    this.isLogIn=true
    this.isLoginModalOpen = true;

  }

  onLogOutClick():void{
    this.authServiceExtension.logOut()
  }
}
