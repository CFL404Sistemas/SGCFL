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
  this.datosUsuario=(JSON.parse(localStorage.getItem('userData')!));

  }
volverhome(){

  this.router.navigate(["home-admin"]);

}
cerrarsecion(){
  this.router.navigate(["login"]);
  localStorage.removeItem('isLogged')
}
editarperfil(){
  this.router.navigate(["edicion-perfil"])
}
}
