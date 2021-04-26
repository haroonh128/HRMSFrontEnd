import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MstBranchesComponent } from '../mst-branches.component';

const routes: Routes = [
  { path: '', component: MstBranchesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchModuleRoutingModule { }
