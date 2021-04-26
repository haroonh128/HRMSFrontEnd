import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MasterComponent } from './master/master.component';
import { PermissionComponent } from './master/permission/permission.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IconsProviderModule } from './icons-provider.module';
import { SidebarModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { UserManagementComponent } from './master/user-management/user-management.component';
import { departmentComponent } from './master/department/department.component';
import { AssgnPermsComponent } from './master/assgn-perms/assgn-perms.component';
import { DeductionTypesComponent } from './master/deduction-types/deduction-types.component';
import { AssignRolesComponent } from './master/assign-roles/assign-roles.component';
import { MstBranchesComponent } from './master/mst-branches/mst-branches.component';



registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MasterComponent,
    PermissionComponent,
    UserManagementComponent,
    DashboardComponent,
    departmentComponent,
    AssgnPermsComponent,
    DeductionTypesComponent,
    AssignRolesComponent,
    MstBranchesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatButtonModule,
    IconsProviderModule,
    SidebarModule,
    TreeViewModule
    //NzLayoutModule,
    //NzMenuModule // Import here
  ],
  providers: [FormBuilder, UserService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    //  ɵb,
    { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
//comment to commit