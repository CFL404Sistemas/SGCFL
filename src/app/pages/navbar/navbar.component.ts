import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 datosUsuario:any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    /* Con getItem, obtenemos los datos del usuario que se encuentran en el localstorage para luego mostrar por medio de la variable datosUsuario los datos del mismo
    en el html */
    /* El json.Parse es para convertir el texto que se obtiene en Objeto nuevamente */
  this.datosUsuario=(JSON.parse(localStorage.getItem('userData')!));

  }
volverhome(){

  if(this.router.url =='/crear-herramienta'){
    this.router.navigate(['/obtener-inventario']);


  }else{
    this.router.navigate(["home-admin"]);

  }
  this.router.navigate(["home-admin"]);

}
cerrarsecion(){
  /* Si cierra sesion. volvemos al home */
  this.router.navigate([""]);
  /* Eliminamos isLogged, por lo tanto no es true */
  localStorage.removeItem('isLogged')
}

}
