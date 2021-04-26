import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { AssignRolesServiceService } from './Services/assign-roles-service.service';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css']
})
export class AssignRolesComponent implements OnInit {
  rolRes: any;//:Response[];
  userRes: any;
  RoleData: any;

  constructor(public shSer: UserService, public mainSer: AssignRolesServiceService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.Reset();
    this.GetRolesData();
    this.GetUserData();
  }

  GetRolesData() {
    this.shSer.GetAllRoles().subscribe(
      res => {
        if (res != null) {
          this.rolRes = res;
        }
      },
      err => { console.error() }
    );
  }

  GetUserData() {
    this.mainSer.GetUsers().subscribe(
      res => {
        if (res != null) {
          this.userRes = res;
        }
      },
      err => { console.error() });
  }


  Reset(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.mainSer.form = {
      id: 0,
      roleId: 0,
      userId: 0,
      createdBy: "",
      createdDate: Date.now().toString(),
      updatedBy: "",
      updatedDate: Date.now().toString()
    };
  }

  Submit() {
   if (this.mainSer.form.roleId== 0 || this.mainSer.form.userId == 0) {
      this.toastr.warning("Choose options from both Drop Downs");
      return;
    }
    else if (this.RoleData==undefined || this.RoleData.length > 0) {
      this.toastr.warning("Multiple Roles are not allowed");
      return;
    }
    
    else {
      this.mainSer.SaveUserRoles().subscribe((res: any) => {
        if (res == 1) {
          this.toastr.success("Success!");
          this.Reset();
        }
      },
        err => {
          this.toastr.error("Failed");
          console.error();
        });
    }
  }

  DeleteUserRoles(p) {
    this.mainSer.DeleteUserRoles(p).subscribe(res => {
      if (res == 1) {
        this.toastr.success("Success!");
      }
    },
      err => {
        this.toastr.error("Failed");
        console.error();
      });
  }

  GetDatabyId(v) {
    this.mainSer.GetDataById(v.target.value).subscribe((res: any) => {
      if (res != null) {
        this.RoleData = res;
      }
    }, err => {
      console.error();
    });
  }
}
