import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeptClass } from '../class/dept-class';

@Injectable({
  providedIn: 'root'
})


export class DeptServicesService {
  formData: DeptClass;
  constructor(private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:54628/api';
  readonly header = new HttpHeaders().set('Content-type', 'application/json; charset=utf-8');
  InsertDepartment() {
    this.formData.createdBy=localStorage.getItem('userName').toString();
    this.formData.id=Number(this.formData.id);
    this.formData.parentDept=Number(this.formData.parentDept);
    this.formData.deptHead=Number(this.formData.deptHead);
    this.formData.deptLevel=Number(this.formData.deptLevel);
    this.formData.deptPrefix=Number(this.formData.deptPrefix);
    return this.http.post<DeptClass>(this.BaseURI+'/Department/InsertDepartment',this.formData,{headers:this.header});
  }
}