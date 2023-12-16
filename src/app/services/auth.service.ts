// auth.service.ts

import {formatDate} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';
import {JwtAuth} from '../Models/jwtAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //Auth/register?username=123456789&email=andrei.diaconu%40bitnovel.com
  registerUrl='Auth/register';
  loginUrl='Auth/login';
  constructor(private http: HttpClient) {}

  
  public register(file:File, username:string, email:string):Observable<JwtAuth>{
    const formData= new FormData()
    formData.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({ 'timeout':'456456'})
    }
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}?username=${username}&email=${email}`, formData,httpOptions);
  }

  
  public login(file:File, username:string):Observable<JwtAuth>{
    const formData= new FormData()
    formData.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({ 'timeout':'456456'})
    }
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}?username=${username}`, formData,httpOptions);
  }
}
