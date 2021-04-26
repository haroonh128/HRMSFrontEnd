import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserManagementserviceService } from './service/user-managementservice.service';
import { ResponseClass } from './class/user-management-class';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  
})
export class UserManagementComponent implements OnInit {
  myDate = "";
  btnSve=true;
  response:any;
  Response:ResponseClass[];
  ResCheck: ResponseClass[];
  constructor(public service: UserManagementserviceService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.reset();
    this.GetData();
  }

  reset(form?: NgModel) {
    if (form != null) {
      form.reset();
    }
    this.service.formData = {
      Password: "",
      Id: "0",
      UserName: "",
      NormalizedUserName:"",
      Email:"",
      NormalizedEmail:"",
      EmailConfirmed:true,
      PasswordHash:"",
      SecurityStamp:"",
      CurrencyStamp:"",
      PhoneNumber:"",
      PhoneNumberConfirmed:true,  
      TwoFactorEnabled:true,
      LockoutEnd:"",//this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
      LockoutEnabled:true,
      AccessFailedCount:"0",
      Discriminator :"",
      FullName: ""
    }
  }

  Submit(form: NgForm) {
    if (form != null) {
      this.service.InsertUser().subscribe((res: any) => {
        if (res == true) {
          this.toastr.success('Inserted Successfully');
          this.GetData();
        }
      }, err => {
        this.toastr.error('User Could not be created');
      });
    }
  }

  Update(form: NgForm) {
    this.service.UpdateUser().subscribe((res: any) => {
      if (res == 1) {
        //localStorage.setItem('token', res);
        this.reset();
        this.toastr.success("User Updated Successfully");
        this.GetData();
      }
    },
      err => {
        if (err.status == 400) {
          this.toastr.error('Incorrect Data', 'Insertion Failed');
        }
      });
  }

  

  Edit(obj) {
    this.btnSve = false;
    this.service.formData = {
      Password: obj["password"],
      Id: obj["id"],
      UserName: obj["userName"],
      NormalizedUserName:"",
      Email:obj["email"],
      NormalizedEmail:"",
      EmailConfirmed:true,
      PasswordHash:"",
      SecurityStamp:"",
      CurrencyStamp:"",
      PhoneNumber:obj["phoneNumber"],
      PhoneNumberConfirmed:true,  
      TwoFactorEnabled:true,
      LockoutEnd:"",
      LockoutEnabled:obj["lockoutEnabled"],
      AccessFailedCount:"0",
      Discriminator :"",
      FullName: obj["fullName"]
    };
  }

  GetData() {
    this.service.GetAllUsers().subscribe(
      res => {
        if (res != null) {
          this.response = res;
          this.Response = this.response;
        }
      },
      err => { console.error() }
    );
  }

  RemoveUser(obj) {
    this.service.remModel = {
      Password: obj["password"],
      Id: obj["id"],
      UserName: obj["userName"],
      NormalizedUserName:"",
      Email:obj["email"],
      NormalizedEmail:"",
      EmailConfirmed:true,
      PasswordHash:"",
      SecurityStamp:"",
      CurrencyStamp:"",
      PhoneNumber:obj["phoneNumber"],
      PhoneNumberConfirmed:true,  
      TwoFactorEnabled:true,
      LockoutEnd:"",
      LockoutEnabled:obj["lockoutEnabled"],
      AccessFailedCount:"0",
      Discriminator :"",
      FullName: obj["fullName"]
    };
    this.service.RemoveUser().subscribe((res: any) => {
      if (res == "1") {
        this.toastr.success("User Removed Successfully");
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
    if (this.service.formData.UserName == "") {
      this.toastr.error("User Name can not be empty");
      return false;
    }
    else if (this.service.formData.FullName == "") {
      this.toastr.error("Full Name can not be empty");
      return false;
    }
    else if (this.service.formData.PhoneNumber == "") {
      this.toastr.error("Phone Number can not be empty");
      return false;
    }
    if (this.service.formData.Password == "") {
      this.toastr.error("Password can not be empty");
      return false;
    }
    if (this.service.formData.Email == "") {
      this.toastr.error("Email can not be empty");
      return false;
    }

      this.ResCheck=this.response.filter(x=>x.PhoneNumber==this.service.formData.PhoneNumber && x.Email == this.service.formData.Email);
      if (this.ResCheck.length > 0) {
        this.toastr.error(this.service.formData.UserName+" already exists");
        return false;
      
    }
    else {
      return true;
    }
  }
}
