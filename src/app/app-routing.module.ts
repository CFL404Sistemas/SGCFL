import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component'
import { CrearherramientaComponent } from './pages/crearherramienta/crearherramienta.component';
import { ObtenerInventarioComponent } from '../app/pages/obtener-inventario/obtener-inventario.component';

import { HomeAdminComponent } from '../app/pages/home-admin/home-admin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { EsUsuarioGuard } from '../app/guard/es-usuario.guard';

const routes: Routes = [
  {
    path: 'home-admin',
    component: HomeAdminComponent,
    canLoad: [EsUsuarioGuard],
  },
  {
    path: 'obtener-inventario',
    component: ObtenerInventarioComponent,
    canLoad: [EsUsuarioGuard],
  },
  {
    path: 'crear-herramienta', component: CrearherramientaComponent,
    canLoad: [EsUsuarioGuard],

  },
  {
    path: 'navbar', component: NavbarComponent,
    canLoad: [EsUsuarioGuard],
  },
  {
    path: 'login', component: LoginComponent,



  },
  {
    path: '', component: LoginComponent,

  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
