import { Component, OnInit } from '@angular/core';
import { DeptServicesService } from './services/dept-services.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class departmentComponent implements OnInit {

  constructor(public service: DeptServicesService, private toastr: ToastrService, private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let orderID = this.currentRoute.snapshot.paramMap.get('code');
    if (orderID == null) {
      this.resetForm();
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.service.formData = {
      id: 0,
      deptLevel: 0,
      code: "",
      deptName: "",
      parentDept: 0,
      flgActive: false,
      createdBy: "",
      updatedBy: "",
      createdDate: new Date(),
      updatedDate: new Date(),
      deptHead: 0,
      deptPrefix: 0
    }

  }

  Submit(form: NgForm) {
    if (form != null) {
      this.service.InsertDepartment().subscribe((res: any) => {
        if (res != null) {
          this.toastr.success("Insertion successful");
        }
      },
        err => {
          if (err.status == 400) {
            this.toastr.error('Error Occured', 'Department');
          }
        });
    }
  }
}
