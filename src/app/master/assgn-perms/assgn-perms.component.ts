import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/home/class/class';
import { UserService } from 'src/app/shared/user.service';
import { PermClass } from '../permission/Classes/perm-class';
import { PermServService } from '../permission/Services/perm-serv.service';
import { AssgnServiceService } from './Services/assgn-service.service';

@Component({
  selector: 'app-assgn-perms',
  templateUrl: './assgn-perms.component.html',
  styleUrls: ['./assgn-perms.component.css']
})
export class AssgnPermsComponent implements OnInit {
  rolsClass: Response[];
  response: any;
  rspPrm: any;
  prmRsp: PermClass[];
  sveLst: Array<PermClass> = [];
  chckBox: boolean;
  roleId: number;
  constructor(private rolSer: UserService,
    private prmSer: PermServService,
    public service: AssgnServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetform();
    this.RolesDD();
    this.GetPermissions();
  }

  RolesDD() {
    this.rolSer.GetAllRoles().subscribe(res => {
      if (res != null) {
        this.response = res;
        this.rolsClass = this.response;
      }
    });
  }

  resetform(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.service.form = {
      rolesDD: 0
    };
  }

  GetPermissions() {
    this.prmSer.GetAllService().subscribe(res => {
      if (res != null) {
        this.rspPrm = res;
        this.prmRsp = this.rspPrm;
      }
    },
      err => {
        console.error();
      });
  }

  AddRemove(row, chckBox) {
    if (chckBox.currentTarget["checked"]) {
      this.sveLst.push(row);
    }
    else if (!chckBox.currentTarget["checked"] && this.sveLst.length > 0) {
      this.sveLst = this.sveLst.filter(x => x !== row);
    }
  }

  SaveRolesPermissions() {
    if (this.sveLst.length > 0) {
      this.prmSer.SaveAuthRoles(this.sveLst, this.roleId).subscribe(res => {
        if (res == 1) {
          this.toastr.success("Permissions Assigned Successfully");
        }
        else {
          this.toastr.error("Permissions Assignment Failed");
        }
      },
        err => {
          console.error();
        });
    }
  }

  // selected(){
  //   console.log(this.roleId)
  //  //this.route.navigate(['schedulemanagement/autoStartStopVm/' + data]);
  // }
}
