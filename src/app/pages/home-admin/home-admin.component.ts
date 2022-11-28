import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";



@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  rolUsuario: any;
  datosUsuario: any
  constructor(private router: Router) { }

  ngOnInit(): void {
      //datos del usuario guardado en el localHost
      this.datosUsuario = JSON.parse(localStorage.getItem('userData')!);
      //rol del usuario para los ngIf
      this.rolUsuario = this.datosUsuario.cargo;//this.datosUsuario.cargo;



  }

  navegarHerramientas() {
    this.router.navigate(["obtener-inventario"]);


  }
 navegarUsuario() { this.router.navigate(["crear-usuario"]);

 }
 navegarHistorial() {
  this.router.navigate(["obtener-historial"]);

 }
}
