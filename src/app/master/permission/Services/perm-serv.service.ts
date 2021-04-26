import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PermClass } from '../Classes/perm-class';

@Injectable({
  providedIn: 'root'
})
export class PermServService {
  model: PermClass;
  remModel: PermClass;
  readonly BaseURI = 'http://localhost:54628/api';


  constructor(private fb: FormBuilder, public http: HttpClient) { }

  CreateService() {
    return this.http.post(this.BaseURI + '/Permission/CreatePermission', this.model);
  }

  UpdateService() {
    return this.http.post(this.BaseURI + '/Permission/UpdatePermission', this.model);
  }

  DeleteService() {
    return this.http.post(this.BaseURI + '/Permission/DeletePermission', this.remModel);
  }

  GetAllService() {
    return this.http.get(this.BaseURI + '/Permission/GetPermissions');
  }

  // Roles Authorization services
  SaveAuthRoles(model: any, roleId: number) {
    return this.http.post(this.BaseURI + '/RolesAuth/SaveRolesAuth', { model, roleId });
  }
}
