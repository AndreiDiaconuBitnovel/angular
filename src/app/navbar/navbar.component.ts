import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isLoginModalOpen: boolean = false;

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeModalHandler(isModalOpen: boolean) {
    this.isLoginModalOpen = isModalOpen;
  }

  onLogin(credentials: { username: string; password: string }) {
    // Handle login logic here
    console.log('Login successful', credentials);
    // Close the modal after handling login
    this.isLoginModalOpen = false;
  }

  onSignUpClick(): void {
    this.authService.signUp();
  }
}
