import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementModuleRoutingModule } from './user-management-module-routing.module';
import { FormsModule } from '@angular/forms';
import { UserManagementComponent } from '../user-management.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserManagementModuleRoutingModule,
    FormsModule
  ],
  exports:[]
})
export class UserManagementModuleModule { }
