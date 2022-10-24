import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component'
import { ObtenerInventarioComponent } from '../app/pages/obtener-inventario/obtener-inventario.component';

const routes: Routes = [

  {
    path: 'login', component: LoginComponent,



  },
  {path:"obtener-inventario" , component:ObtenerInventarioComponent,
}

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
