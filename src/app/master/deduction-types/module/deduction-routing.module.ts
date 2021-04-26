import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionTypesComponent } from '../deduction-types.component';

const routes: Routes = [
  { path: '', component: DeductionTypesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeductionRoutingModule { }
