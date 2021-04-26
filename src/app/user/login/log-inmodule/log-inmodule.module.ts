import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInmoduleRoutingModule } from './log-inmodule-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login.component';
import { LoginServiceService } from '../services/login-service.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LogInmoduleRoutingModule
    ],
  declarations: [LoginComponent],
  providers:[LoginServiceService]
})
export class LogInmoduleModule { }
