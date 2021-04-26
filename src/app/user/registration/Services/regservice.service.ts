import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegserviceService {
  readonly BaseURI = 'http://localhost:54628/api';

  constructor(public fb: FormBuilder, private http: HttpClient) { }
  formModel = this.fb.group({
    FullName: [''],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    },
      {
        validators: this.comparePasswords
      })
  });

  comparePasswords(fb: FormGroup) {
    let comparePassword = fb.get('ConfirmPassword');
    if (comparePassword.errors == null || 'passwordMismatch' in comparePassword.errors) {
      if (fb.get('Password').value != comparePassword.value) {
        comparePassword.setErrors({ passwordMismatch: true });
      }
      else { comparePassword.setErrors(null); }
    }
  }

  Register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
}