import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import {JwtAuth} from 'src/app/Models/jwtAuth';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceExtensionService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private authenticationService: AuthService) {
    const token = localStorage.getItem('jwtToken');
    this._isLoggedIn.next(!!token);
  }


  

  logOut() {
    localStorage.setItem('jwtToken', '');
    this._isLoggedIn.next(false);
  }

  login(file:File, username:string) {
    return this.authenticationService.login(file, username).pipe(
      tap((response: JwtAuth) => {
        console.log(response)
        if (response.isSuccessful === true) {
          this._isLoggedIn.next(true);
          localStorage.setItem('jwtToken', response.token);
        }
      })
    );
  }
}
