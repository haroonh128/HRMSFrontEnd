import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegmoduleRoutingModule } from './regmodule-routing.module';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/user.service';
import { RegistrationComponent } from '../registration.component';
import { RegserviceService } from '../Services/regservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/auth/auth.interceptor';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RegmoduleRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RegistrationComponent],
  providers: [RegserviceService],
  bootstrap:[RegistrationComponent]
})
export class RegmoduleModule { }
