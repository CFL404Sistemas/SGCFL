import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-obtener-inventario',
  templateUrl: './obtener-inventario.component.html',
  styleUrls: ['./obtener-inventario.component.scss'],
})
export class ObtenerInventarioComponent implements OnInit {
  todasLasHerramientas: any;
  herramientasAAsignar: number[] = [0];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.obtenerHerramientas().subscribe((response: any) => {
      console.log(response);
      this.todasLasHerramientas = response.response;
    });
  }

  asignar(herramienta: any) {

    const idHerr:number=parseInt(herramienta.id);
 this.herramientasAAsignar.forEach(element => {
  element===idHerr? this.herramientasAAsignar.splice(element):this.herramientasAAsignar.unshift(idHerr);
  element==0?this.herramientasAAsignar.shift():null;
});
 console.log(this.herramientasAAsignar)


    // if(this.herramientasAAsignar[i]==idHerramienta){
    //   this.herramientasAAsignar.splice(i,1);
    //   i--;
    // }else{
    //   this.herramientasAAsignar.push(idHerramienta)
    // }

    //foreach
    // this.herramientasAAsignar.forEach(element => {
    //   if(element==idHerramienta){
    //     this.herramientasAAsignar.splice(element);
    //   }else{
    //     this.herramientasAAsignar.push(idHerramienta)
    //   }
    // });
  }




  aceptarAsignacion() {}

  irAltaHerramienta() {
    this.router.navigate(['crear-herramienta']);
  }
}
