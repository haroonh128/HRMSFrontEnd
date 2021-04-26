import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserManagementClass } from '../class/user-management-class';

@Injectable({
  providedIn: 'root'
})
export class UserManagementserviceService {
  formData: UserManagementClass;
  remModel:UserManagementClass;
  readonly BaseURI = 'http://localhost:54628/api';
  readonly header = new HttpHeaders().set('Content-type', 'Application/json; charset=utf-8');
  constructor(public http: HttpClient) { }

  InsertUser() {
    return this.http.post(this.BaseURI + '/UserProfile/InsertUser', this.formData);
  }

  UpdateUser() {
    return this.http.post(this.BaseURI + '/UserProfile/UpdateUser', this.formData);
  }

  GetAllUsers() {
    return this.http.get(this.BaseURI + '/UserProfile/GetAllUsers');
  }

  RemoveUser(){
    return this.http.post(this.BaseURI+'/UserProfile/RemoveUser',this.remModel);
  }

}
