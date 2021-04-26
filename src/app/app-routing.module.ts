import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  {
    path: 'user', component: MasterComponent, children: [
      { path: 'registration', loadChildren: () => import('./user/registration/regmodule/regmodule.module').then(m => m.RegmoduleModule) },
      { path: 'login', loadChildren: () => import('./user/login/log-inmodule/log-inmodule.module').then(m => m.LogInmoduleModule) },
    ]
  },

  {
    path: 'master', component: MasterComponent, children: [
      { path: 'department', loadChildren: () => import('./master/department/dept/dept.module').then(m => m.DeptModule) },
      { path: 'user-management', loadChildren: () => import('./master/user-management/module/user-management-module.module').then(m => m.UserManagementModuleModule) },
      { path: 'permission', loadChildren: () => import('./master/permission/perm-mod/perm-mod.module').then(m => m.PermModModule) },
      { path: 'assgn-perms', loadChildren: () => import('./master/assgn-perms/asgn-prm/asgn-prm.module').then(m => m.AsgnPrmModule) },
      { path: 'deduction-types', loadChildren: () => import('./master/deduction-types/module/deduction.module').then(m => m.DeductionModule) },
      { path: 'assign-roles', loadChildren: () => import('./master/assign-roles/assign-rolesmodules/assign-rolesmodules.module').then(m => m.AssignRolesmodulesModule) },
      { path: 'mst-branches', loadChildren: () => import('./master/mst-branches/branch-module/branch-module.module').then(m => m.BranchModuleModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
