import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component'
import { CrearherramientaComponent } from './pages/crearherramienta/crearherramienta.component';
import { ObtenerInventarioComponent } from '../app/pages/obtener-inventario/obtener-inventario.component';

import { HomeAdminComponent } from '../app/pages/home-admin/home-admin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';


const routes: Routes = [
  {
    path: 'home-admin',
    component: HomeAdminComponent},
  {
    path: 'obtener-inventario',
    component: ObtenerInventarioComponent,  },
  { path: 'crear-herramienta', component: CrearherramientaComponent },
  { path: 'navbar', component: NavbarComponent },
  {
    path: 'login', component: LoginComponent,



  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
