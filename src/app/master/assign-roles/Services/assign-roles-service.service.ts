import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AssignRolesClass } from '../classes/assign-roles-class';

@Injectable({
  providedIn: 'root'
})
export class AssignRolesServiceService {

  form: AssignRolesClass;
  readonly BaseURI = 'http://localhost:54628/api';
  constructor(public http: HttpClient, private fb: FormBuilder) { }

  GetUsers() {
    return this.http.get(this.BaseURI + '/AssignRoles/GetAllUsers');
  }

  SaveUserRoles() {
    return this.http.post(this.BaseURI + '/AssignRoles/SaveUserRoles', this.form);
  }

  DeleteUserRoles(p) {
    this.form.id=p.id;
    this.form.roleId=p.roleId;
    this.form.userId=p.userId;
    return this.http.post(this.BaseURI + '/AssignRoles/DeleteUserRoles', this.form);
  }

  GetDataById(id) {
    let a = id.split(":");
    id = a[1].toString();
    return this.http.post(this.BaseURI + '/AssignRoles/GetRolesById', {id:id});
  }
}
