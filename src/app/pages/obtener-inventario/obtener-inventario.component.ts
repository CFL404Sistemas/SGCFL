import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { find } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-obtener-inventario',
  templateUrl: './obtener-inventario.component.html',
  styleUrls: ['./obtener-inventario.component.scss'],
})

export class ObtenerInventarioComponent implements OnInit {
  todasLasHerramientas:any;
  herramientasAAsignar: number[]=[];


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.obtenerHerramientas().subscribe((response:any)=>{
      console.log(response)
      this.todasLasHerramientas=response.response;
    })


  }

  asignar(herramienta:any){
    if(this.herramientasAAsignar.includes(herramienta.id)){
      let index=this.herramientasAAsignar.indexOf(herramienta.id);
      this.herramientasAAsignar.splice(index,1)
    }else{
      this.herramientasAAsignar.push(herramienta.id)
    }
    this.herramientasAAsignar.sort(
      function(a,b){return a-b}
    );
    console.log(this.herramientasAAsignar)
  }

  aceptarAsignacion(){

  }

irAltaHerramienta(){
  this.router.navigate(["crear-herramienta"]);
}




}
