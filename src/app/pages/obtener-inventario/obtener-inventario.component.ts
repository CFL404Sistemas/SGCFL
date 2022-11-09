import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { find } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-obtener-inventario',
  templateUrl: './obtener-inventario.component.html',
  styleUrls: ['./obtener-inventario.component.scss'],
})


export class ObtenerInventarioComponent implements OnInit {
  todasLasHerramientas: any;
  herramientasAAsignar: number[] = [];
  herramientasAMostrar:any;
  filtro:any;

  constructor(private router: Router, private authService: AuthService,private _snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    console.log(this.todasLasHerramientas)
    // codigo de estados de las herrmamientas:
    // 0: disponible
    // 1: asignada
    // 2: en reparacion
    // 3: en revision
    // 4: dada de baja

    this.authService.obtenerHerramientas().subscribe((response:any)=>{
      console.log(response)
      this.todasLasHerramientas=response.response;
      this.herramientasAMostrar=this.todasLasHerramientas;
    })

  }

  //filtros

  //

  filtrar(num:number){
    // alert(num);
    switch(num){
      case 0: this.herramientasAMostrar=this.todasLasHerramientas.filter((e: any)=>e.estado==0);
      break;
      case 1:this.herramientasAMostrar=this.todasLasHerramientas.filter((e: any)=>e.estado==1);
      break;
      case 2: this.herramientasAMostrar=this.todasLasHerramientas.filter((e: any)=>e.estado==2);
      break;
      case 3: this.herramientasAMostrar=this.todasLasHerramientas.filter((e: any)=>e.estado==3);
      break;
      case 4: this.herramientasAMostrar=this.todasLasHerramientas.filter((e: any)=>e.estado==4);
      break;
      case 5: this.herramientasAMostrar=this.todasLasHerramientas
    }
  }

//buscar en el buscador

buscarPorNombre(event:any){
  console.log(event.target.value)
  let palabra=event.target.value.toUpperCase().toLowerCase();
  this.herramientasAMostrar=this.todasLasHerramientas.filter((e:any)=>e.nombre.toUpperCase().toLowerCase().includes(palabra));
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
    if(this.herramientasAAsignar.length>0){
      this._snackBar.open('Ud se ha asignado '+(this.herramientasAAsignar.length)+' herramienta(s)', 'Cerrar');

    }else{
      this._snackBar.open('Por favor, asigne alguna herramienta', 'Cerrar');
    }

  }


  irAltaHerramienta() {
    this.router.navigate(['crear-herramienta']);
  }
}




