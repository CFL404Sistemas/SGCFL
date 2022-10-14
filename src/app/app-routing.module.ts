import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeAdminComponent} from '../app/pages/home-admin/home-admin.component'
const routes: Routes = [
  {
    path: 'home-admin', component:HomeAdminComponent

  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
