import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginClass } from '../classes/login-class';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  readonly BaseURI = 'http://localhost:54628/api';
  constructor(private http: HttpClient) { }
  formModel: LoginClass;

  Login() {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', this.formModel);
  }
}