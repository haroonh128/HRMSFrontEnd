import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeductionClass } from './Classes/deduction-class';
import { DeductionServicesService } from './Services/deduction-services.service';

@Component({
  selector: 'app-deduction-types',
  templateUrl: './deduction-types.component.html',
  styleUrls: ['./deduction-types.component.css']
})
export class DeductionTypesComponent implements OnInit {

  btnSve: boolean;
  response: any;
  Response: DeductionClass[];
  ResCheck: DeductionClass[];

  constructor(public ser: DeductionServicesService, private toastr: ToastrService) { }

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
    // if (form != null) {
    //   form.form.reset();
    // }
    this.ser.model = {
      id: 0,
      name: "",
      isActive: false,
    };
    this.GetData();
    this.btnSve = true;
  }

  Edit(obj) {
    this.btnSve = false;
    this.ser.model = {
      id: obj["id"],
      name: obj["name"],
      isActive: obj["isActive"],
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
      id: obj["id"],
      name: obj["name"],
      isActive: obj["isActive"],
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
    if (this.ser.model.name == "") {
      this.toastr.error("Fields can not be empty");
      return false;
    }
    else if (this.Response.filter(x => x.name == this.ser.model.name && x.isActive == this.ser.model.isActive).length > 0) {
      this.toastr.error("Cannot Create Duplicate Data");
    }
    else {
      return true;
    }
  }

}
