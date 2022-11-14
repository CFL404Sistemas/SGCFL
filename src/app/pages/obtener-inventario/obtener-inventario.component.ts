import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { find } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-obtener-inventario',
  templateUrl: './obtener-inventario.component.html',
  styleUrls: ['./obtener-inventario.component.scss'],
})
export class ObtenerInventarioComponent implements OnInit {
  todasLasHerramientas: any;
  //array de herr a asignar para enviar al back
  herramientasAAsignar: number[] = [];
  herramientasAMostrar: any;
  filtro: any;
  datosUsuario: any;
  rolUsuario: any;

  //array de herramientas para poner en revision
  herramientasARevisar: number[] = [];

  //herramientas a des-asignar
  herramientasADesasignar: number[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.todasLasHerramientas);
    // codigo de estados de las herrmamientas:
    // 0: disponible
    // 1: asignada
    // 2: en reparacion
    // 3: en revision
    // 4: dada de baja

    //datos del usuario guardado en el localHost
    this.datosUsuario = JSON.parse(localStorage.getItem('userData')!);
    //rol del usuario para los ngIf
    this.rolUsuario = this.datosUsuario.cargo;

    console.log(this.rolUsuario);

    this.authService.obtenerHerramientas().subscribe((response: any) => {
      console.log(response);
      this.todasLasHerramientas = response.response;
      this.herramientasAMostrar = this.todasLasHerramientas;
    });
  }

  //filtros

  filtrar(num: number) {
    // alert(num);
    switch (num) {
      case 0:
        this.herramientasAMostrar = this.todasLasHerramientas.filter(
          (e: any) => e.estado == 0
        );
        break;
      case 1:
        this.herramientasAMostrar = this.todasLasHerramientas.filter(
          (e: any) => e.estado == 1
        );
        break;
      case 2:
        this.herramientasAMostrar = this.todasLasHerramientas.filter(
          (e: any) => e.estado == 2
        );
        break;
      case 3:
        this.herramientasAMostrar = this.todasLasHerramientas.filter(
          (e: any) => e.estado == 3
        );
        break;
      case 4:
        this.herramientasAMostrar = this.todasLasHerramientas.filter(
          (e: any) => e.estado == 4
        );
        break;
      case 5:
        this.herramientasAMostrar = this.todasLasHerramientas;
    }
  }

  //buscar en el buscador

  buscarPorNombre(event: any) {
    console.log(event.target.value);
    let palabra = event.target.value.toUpperCase().toLowerCase();
    this.herramientasAMostrar = this.todasLasHerramientas.filter((e: any) =>
      e.nombre.toUpperCase().toLowerCase().includes(palabra)
    );
  }

  //boton "aceptar", muestra y envia datos al back segun las acciones que se hayan hecho
  asignar(herramienta: any) {
    if (this.herramientasAAsignar.includes(herramienta.id)) {
      let index = this.herramientasAAsignar.indexOf(herramienta.id);
      this.herramientasAAsignar.splice(index, 1);
    } else {
      this.herramientasAAsignar.push(herramienta.id);
    }
    this.herramientasAAsignar.sort(function (a, b) {
      return a - b;
    });
    console.log('Herramientas a asignar: ' + this.herramientasAAsignar);
  }

  aceptar() {
    //aceptar la asignacion
    if (this.herramientasAAsignar.length > 0&&this.herramientasADesasignar.length== 0&&this.herramientasARevisar.length== 0) {
      this._snackBar.open(
        'Ud se ha asignado ' +
          this.herramientasAAsignar.length +
          ' herramienta(s)',
        'Cerrar'
      );
    }else{
      this._snackBar.open(
        'No puede asignar herramientas sino completa otras acciones',
        'Cerrar'
      );
    }

    //aceptar la des-asignacion
    if (this.herramientasAAsignar.length == 0&&this.herramientasADesasignar.length> 0&&this.herramientasARevisar.length== 0) {
      this._snackBar.open(
        'Ud se ha des-asignado ' +
        this.herramientasADesasignar.length +
        ' herramienta(s)',
        'Cerrar');
    }else{
      this._snackBar.open(
        'No puede des-asignar herramientas sino completa otras acciones',
        'Cerrar'
      );
    }

    //aceptar la puesta en revision
    if (this.herramientasAAsignar.length== 0&&this.herramientasADesasignar.length== 0&&this.herramientasARevisar.length> 0) {
      this._snackBar.open(
      'Ud se ha puesto ' +
        this.herramientasARevisar.length +
        ' herramienta(s) para revisión',
        'Cerrar');
    }else{
      this._snackBar.open(
        'No puede poner en revisión herramientas sino completa otras acciones',
        'Cerrar'
      );
    }

  }


  //cancelar y limpiar todos los arrays
  cancelar(){
    this.herramientasAAsignar=[];
    this.herramientasADesasignar=[];
    this.herramientasARevisar=[];
    this._snackBar.open(
      'Ud ha cancelado todas las acciones',
      'Cerrar'
    );
  }

  //poner en revision

  ponerEnRevision(herramienta: any) {
    if (this.herramientasARevisar.includes(herramienta.id)) {
      let index = this.herramientasARevisar.indexOf(herramienta.id);
      this.herramientasARevisar.splice(index, 1);
    } else {
      this.herramientasARevisar.push(herramienta.id);
    }
    this.herramientasARevisar.sort(function (a, b) {
      return a - b;
    });
    console.log('Herramientas a revisar: ' + this.herramientasARevisar);
  }

  //devolucion de herramienta
  devolverHerramienta(herramienta: any) {
    if (this.herramientasADesasignar.includes(herramienta.id)) {
      let index = this.herramientasADesasignar.indexOf(herramienta.id);
      this.herramientasADesasignar.splice(index, 1);
    } else {
      this.herramientasADesasignar.push(herramienta.id);
    }
    this.herramientasADesasignar.sort(function (a, b) {
      return a - b;
    });
    console.log('Herramientas a des-asignar: ' + this.herramientasADesasignar);
  }

  //alta de herramientas
  irAltaHerramienta() {
    this.router.navigate(['crear-herramienta']);
  }
}
