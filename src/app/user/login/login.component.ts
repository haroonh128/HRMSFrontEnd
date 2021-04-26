import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from './services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public service: LoginServiceService, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.route.navigateByUrl('/dashboard');
    }
    this.resetform();
  }
  
  resetform(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.service.formModel = {
      UserName: "",
      Password: ""
    }
  }
  Submit(from: NgForm) {
    this.service.Login().subscribe((res: any) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.route.navigateByUrl('/dashboard');
      }
    },
      err => {
        if (err.status == 400) {
          this.toastr.error('Incorrect username or password', 'Authentication failed');
        }
      });
  }
}