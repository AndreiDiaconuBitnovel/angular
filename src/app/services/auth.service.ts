// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Replace this with your actual authentication logic

  login(): void {
    // Simulate a login process
    console.log('Login button clicked - perform login logic here');
  }

  signUp(): void {
    // Simulate a sign-up process
    console.log('Sign Up button clicked - perform sign-up logic here');
  }
}
