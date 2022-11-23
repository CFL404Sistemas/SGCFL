import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component'
import { CrearherramientaComponent } from './pages/crearherramienta/crearherramienta.component';
import { ObtenerInventarioComponent } from '../app/pages/obtener-inventario/obtener-inventario.component';
import { HomeAdminComponent } from '../app/pages/home-admin/home-admin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import {CrearUsuarioComponent} from './pages/crear-usuario/crear-usuario.component';


import { ObtenerHistorialComponent } from './pages/obtener-historial/obtener-historial.component';

import { ValidadorGuard } from '../app/guard/validador.guard';

const routes: Routes = [
  {
    path: 'home-admin',
    component: HomeAdminComponent,
    canActivate: [ValidadorGuard],
  },
  {
    path: 'obtener-inventario',
    component: ObtenerInventarioComponent,
    canActivate: [ValidadorGuard],
  },
  {
    path: 'crear-herramienta', component: CrearherramientaComponent,
    canActivate: [ValidadorGuard],

  },
  {
    path: 'navbar', component: NavbarComponent,
    canActivate: [ValidadorGuard],
  },
  {
    path: 'crear-usuario', component:CrearUsuarioComponent,
  },
  {
    path: '', component: LoginComponent,
  },

  {
    path: 'obtener-historial', component: ObtenerHistorialComponent,
  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
