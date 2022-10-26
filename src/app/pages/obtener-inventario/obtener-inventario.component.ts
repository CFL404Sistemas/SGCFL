import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-obtener-inventario',
  templateUrl: './obtener-inventario.component.html',
  styleUrls: ['./obtener-inventario.component.scss'],
})

export class ObtenerInventarioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

irAltaHerramienta(){
  this.router.navigate(["crear-herramienta"]);

}

}
