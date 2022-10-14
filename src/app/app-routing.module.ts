import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObtenerInventarioComponent } from '../app/pages/obtener-inventario/obtener-inventario.component';
const routes: Routes = [
  {
    path:"obtener-inventario" , component:ObtenerInventarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
