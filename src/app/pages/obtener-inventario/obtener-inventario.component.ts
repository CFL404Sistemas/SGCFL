import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-obtener-inventario',
  templateUrl: './obtener-inventario.component.html',
  styleUrls: ['./obtener-inventario.component.scss'],
})

export class ObtenerInventarioComponent implements OnInit {
  todasLasHerramientas:any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.obtenerHerramientas().subscribe((response:any)=>{
      console.log(response)
      this.todasLasHerramientas=response;
    })
  }

irAltaHerramienta(){
  this.router.navigate(["crear-herramienta"]);
}




}
