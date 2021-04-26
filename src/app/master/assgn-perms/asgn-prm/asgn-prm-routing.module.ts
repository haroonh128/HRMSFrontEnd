import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssgnPermsComponent } from '../assgn-perms.component';

const routes: Routes = [
  { path: '', component: AssgnPermsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsgnPrmRoutingModule { }
