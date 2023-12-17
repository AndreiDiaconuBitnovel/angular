import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthServiceExtensionService } from '../services/authServiceExtension/auth-service-extension.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogedIn:boolean=false
  constructor(
    private authService: AuthService,
    public authServiceExtension: AuthServiceExtensionService,
    private router: Router,

  ) {}
  ngOnInit(): void {
    this.authServiceExtension.isLoggedIn.subscribe(result=>this.isLogedIn=result);
  }

  @Output() loggedOut = new EventEmitter<boolean>();
  isLoginModalOpen: boolean = false;
  isSignUp: boolean = true;

  openLoginModal() {
    this.isSignUp = false;
    this.isLoginModalOpen = true;
  }

  closeModalHandler(isModalOpen: boolean) {
    this.isLoginModalOpen = isModalOpen;
  }

  onLogin(credentials: { username: string; email: string }) {
    // Handle login logic here
    // Close the modal after handling login
    this.isLoginModalOpen = false;
  }

  onSignUpClick(): void {
    this.isSignUp = true;
    this.isLoginModalOpen = true;
  }

  onLogOutClick(): void {
    this.authServiceExtension.logOut();
    this.router.navigate(['/firstPage']);
  }
}
