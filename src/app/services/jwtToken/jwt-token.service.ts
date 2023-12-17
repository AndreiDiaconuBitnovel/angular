import { Injectable } from '@angular/core';
import {jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  getUserId(): string {
    const token = localStorage.getItem('jwtToken') || '';
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    if(!tokenInfo){
      return ''
    }
    const role =
      tokenInfo['userId']; // get userId
    return role;
  }

  getRole(): string {
    const token = localStorage.getItem('jwtToken') || '';
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    const role =
      tokenInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // get token expiration dateTime
    return role;
  }

  getEmail(): string {
    const token = localStorage.getItem('jwtToken') || '';
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    const email =
      tokenInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']; 
    return email;
  }

  getUsername(): string {
    const token = localStorage.getItem('jwtToken') || '';
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    const role =
      tokenInfo['userName']; // get userId
    return role;
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode (token);
    } catch (Error) {
      return null;
    }
  }
}
