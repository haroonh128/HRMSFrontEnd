import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { departmentComponent } from '../department.component';


const routes: Routes = [
  { path: '', component: departmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptRoutingModule { }
