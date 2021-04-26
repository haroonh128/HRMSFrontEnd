import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formatCurrency, getLocaleDateFormat } from '@angular/common';
import { PermServService } from './Services/perm-serv.service';
import { PermClass } from './Classes/perm-class';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  btnSve: boolean;
  response: any;
  Response: PermClass[];
  ResCheck: PermClass[];

  constructor(public ser: PermServService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.btnSve = true;
    this.resetform();
    this.GetData();
  }

  Submit(form: NgForm) {
    if (!this.Validate()) {
      return;
    }
    else {
      this.ser.CreateService().subscribe((res: any) => {
        if (res == "1") {
          //localStorage.setItem('token', res);
          this.resetform();
          this.toastr.success("Role Created Successfully");
          this.GetData();
        }
      },
        err => {
          if (err.status == 400) {
            this.toastr.error('Incorrect Data', 'Insertion Failed');
          }
        });
    }
  }

  Update(form: NgForm) {
    if (this.Validate()) {
      this.ser.UpdateService().subscribe((res: any) => {
        if (res == "1") {
          //localStorage.setItem('token', res);
          this.resetform(form);
          this.toastr.success("Role Updated Successfully");
          this.GetData();
        }
      },
        err => {
          if (err.status == 400) {
            this.toastr.error('Incorrect Data', 'Insertion Failed');
          }
        });
    }
  }

  resetform(form?: NgForm) {
    if (form != null) {
      form.form.reset();
      this.btnSve = true;
    }
    this.ser.model = {
      Id: 0,
      parentId: 0,
      title: "",
      url: ""
    };
    this.GetData();
  }

  Edit(obj) {
    this.btnSve = false;
    this.ser.model = {
      Id: obj["id"],
      parentId: obj["parentId"],
      title: obj["title"],
      url: obj["url"]
    };
  }

  GetData() {
    this.ser.GetAllService().subscribe(
      res => {
        if (res != null) {
          this.response = res;
          this.Response = this.response;
        }
      },
      err => { console.error(); }
    );
  }

  RemoveRole(obj) {
    this.ser.remModel = {
      Id: obj["id"],
      parentId: obj["parentId"],
      title: obj["title"],
      url: obj["url"]
    };
    this.ser.DeleteService().subscribe((res: any) => {
      if (res == "1") {
        this.toastr.success("Role Removed Successfully");
        this.GetData();
      }
    },
      err => {
        if (err.status == 400) {
          this.toastr.error("Removal Unsuccessful");
        }
      }
    );
  }

  Validate() {
    if (this.ser.model.parentId == null) {
      this.toastr.error("Fields can not be empty");
      return false;
    }

    else if (this.ser.model.title == "") {
      this.toastr.error("Fields can not be empty");
      return false;
    }

    else if (this.ser.model.url == "") {
      this.toastr.error("Fields can not be empty");
      return false;
    }

    this.ResCheck = this.response.filter(x => x.parentId == this.ser.model.parentId && x.title == this.ser.model.title && x.url == this.ser.model.url);
    if (this.ResCheck.length > 0) {
      this.toastr.error(this.ser.model.title + " already exists");
      return false;
    }
    else {
      return true;
    }
  }

}