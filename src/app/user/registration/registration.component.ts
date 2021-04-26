import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegserviceService } from './Services/regservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})

export class RegistrationComponent implements OnInit {

  constructor(public service: RegserviceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  OnSubmit() {
    this.service.Register().subscribe(
      (res: any) => {
        if (res.succeded) {
          this.service.formModel.reset();
          this.toastr.success("User Successfully Registered");
        }
        else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error("Duplicate User Name");
                break;
              default:
                break;
            }
          });
        }
      },
      err => {
        console.error();
      });
  }
}