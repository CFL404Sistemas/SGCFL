import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearherramientaComponent } from './pages/crearherramienta/crearherramienta.component';
const routes: Routes = [ {path:'crear-herramienta', component:CrearherramientaComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
