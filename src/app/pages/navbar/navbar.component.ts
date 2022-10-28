import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {


  }
volverhome(){
  if(this.router.url =='/crear-herramienta'){
    this.router.navigate(['/obtener-inventario']);

  }else{
    this.router.navigate(["home-admin"]);

  }

}
}
