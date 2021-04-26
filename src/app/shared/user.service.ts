import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup,NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Class } from '../home/class/class';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  formModel:Class;
  remModel:Class;

  constructor(private fb: FormBuilder, private http: HttpClient) { }
   readonly BaseURI = 'http://localhost:54628/api';

  getUserProfile()
  {
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    //comment to commit
    return this.http.get(this.BaseURI+'/UserProfile/GetUserProfile',{headers:tokenHeader});
  }

  Roles(){
    return this.http.post(this.BaseURI+'/UserRoles/CreateRole',this.formModel);
  }

  UpdateRoles(){
    return this.http.post(this.BaseURI+'/UserRoles/UpdateRole',this.formModel);
  }
  
  GetAllRoles(){
    return this.http.get(this.BaseURI+'/UserRoles/GetAllRoles');
  }

  RemoveRole(){
    return this.http.post(this.BaseURI+'/UserRoles/RemoveRole',this.remModel);
  }
}