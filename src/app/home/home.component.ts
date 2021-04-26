import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { Response } from '../home/class/class';
import { formatCurrency, getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //userDetails;
  response: any;//:Response[];
  Response: Response[];
  btnSve: boolean;
  ResCheck: Response[];
  constructor(private router: Router, public ser: UserService, private acRoute: ActivatedRoute, private toastr: ToastrService) {

    // this.ser.getUserProfile().subscribe(
    //   res => {
    //     this.userDetails = res;
    //     localStorage.setItem('userName', this.userDetails.userName);
    //   },
    //   err => { console.error() }
    // );
  }

  ngOnInit(): void {
    this.btnSve = true;
    this.resetform();
    this.GetData();
  }

  Submit(form: NgForm) {
    if (!this.Validate()) {
      return false;
    }
    else {
      this.ser.Roles().subscribe((res: any) => {
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
    if (!this.Validate()) {
      return false;
    }
    else {
      this.ser.UpdateRoles().subscribe((res: any) => {
        if (res == "1") {
          //localStorage.setItem('token', res);
          this.resetform();
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
    }
    this.ser.formModel = {
      Id: 0,
      Name: "",
      NormalizedName: "",
    };
    this.btnSve = true;
  }

  Edit(obj) {
    this.btnSve = false;
    this.ser.formModel = {
      Id: obj["id"],
      Name: obj["name"],
      NormalizedName: obj["normalizedName"]
    };
  }

  GetData() {
    this.ser.GetAllRoles().subscribe(
      res => {
        if (res != null) {
          this.response = res;
          this.Response = this.response;
        }
      },
      err => { console.error() }
    );
  }

  RemoveRole(obj) {
    this.ser.remModel = {
      Id: obj["id"],
      Name: obj["name"],
      NormalizedName: obj["normalizedName"]
    };
    this.ser.RemoveRole().subscribe((res: any) => {
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
    if (this.ser.formModel.Name == "") {
      this.toastr.error("Fields can not be empty");
      return false;
    }

    this.ResCheck = this.response.filter(x => x.name == this.ser.formModel.Name && x.normalizedName == this.ser.formModel.NormalizedName);
    if (this.ResCheck.length > 0) {
      this.toastr.error(this.ser.formModel.Name + " already exists");
      return false;
    }

    else {
      return true;
    }
  }

}