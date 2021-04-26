import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DeductionClass } from '../Classes/deduction-class';

@Injectable({
  providedIn: 'root'
})
export class DeductionServicesService {

  model: DeductionClass;
  remModel: DeductionClass;
  readonly BaseURI = 'http://localhost:54628/api';


  constructor(private fb: FormBuilder, public http: HttpClient) { }

  CreateService() {
    return this.http.post(this.BaseURI + '/DeductionTypes/CreateDeductionTypes', this.model);
  }

  UpdateService() {
    return this.http.post(this.BaseURI + '/DeductionTypes/UpdateDeductionTypes', this.model);
  }

  DeleteService() {
    return this.http.post(this.BaseURI + '/DeductionTypes/DeleteDeductionTypes', this.remModel);
  }

  GetAllService() {
    return this.http.get(this.BaseURI + '/DeductionTypes/GetDeductionTypes');
  }

  // Roles Authorization services
  SaveAuthRoles(model: any, roleId: number) {
    return this.http.post(this.BaseURI + '/RolesAuth/SaveRolesAuth', { model, roleId });
  }
}
