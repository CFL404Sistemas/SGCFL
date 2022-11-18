import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectableObservable, filter } from 'rxjs';
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
  filtro: number=0;
  datosUsuario: any;
  rolUsuario: any;
  cancelarOn:boolean=false;

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
    this.rolUsuario = 'ADMINISTRADOR'//this.datosUsuario.cargo;

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
      default:
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
  asignar(herramienta: any,x: number) {
    if (this.herramientasAAsignar.includes(herramienta.id)) {
      let index = this.herramientasAAsignar.indexOf(herramienta.id);
      this.herramientasAAsignar.splice(index, 1);
      //Codigo para cambiale el estado a la entidad pincipal en su posicion x del aray
      // this.herramientasAMostrar[x].estado = 0;
      //

    } else {
      this.herramientasAAsignar.push(herramienta.id);
        //Codigo para cambiale el estado a la entidad pincipal en su posicion x del aray
      // this.herramientasAMostrar[x].estado = 1;
        //
    }
    this.herramientasAAsignar.sort(function (a, b) {
      return a - b;
    });
    console.log('Herramientas a asignar: ' + this.herramientasAAsignar);
  }

  aceptar() {
    let aAsignar = this.herramientasAAsignar.length;
    let aRevision = this.herramientasARevisar.length;
    let aDesasignar = this.herramientasADesasignar.length;

    if (aAsignar > 0 && aDesasignar == 0 && aRevision == 0) {
      //asignar si, desasignar no, revisar no
      //aceptar asignar
      this._snackBar.open(
        'Ud se ha asignado ' +
          this.herramientasAAsignar.length +
          ' herramienta(s)',
        'Cerrar'
      );
    } else if (
      (aAsignar > 0 && aDesasignar != 0 && aRevision == 0) ||
      (aAsignar > 0 && aDesasignar == 0 && aRevision != 0)
    ) {
      //asignar si, desasignar si, revisar no O asignar si, desasignar no, revisar si
      //hay otras acciones pendientes
      this._snackBar.open(
        'Hay otras acciones pendientes antes de asignar herramientas',
        'Cerrar'
      );
    } else if (aAsignar == 0 && aDesasignar == 0 && aRevision == 0) {
      // arrays vacios
      //hoy hay herramientas
      this._snackBar.open(
        'NO ha realizado ninguna acción',
        'Cerrar'
      );
    } else if (aAsignar == 0 && aDesasignar > 0 && aRevision == 0) {
      //asignar no, desasignar si, revisar no
      //aceptar desasignar
      this._snackBar.open(
        'Ud se ha des-asignado ' +
          this.herramientasADesasignar.length +
          ' herramienta(s)',
        'Cerrar'
      );
    } else if (
      (aAsignar != 0 && aDesasignar > 0 && aRevision == 0) ||
      (aAsignar == 0 && aDesasignar > 0 && aRevision == 0)
    ) {
      //asignar si, desasignar si, revisar no O asignar no, desasignar si, revisar si
      //hay acciones pendientes
      this._snackBar.open(
        'Hay otras acciones pendientes antes de asignar herramientas',
        'Cerrar'
      );
    } else if (aAsignar == 0 && aDesasignar == 0 && aRevision > 0) {
      //asignar no, desasignar no, revisar si
      //aceptar revisar
      this._snackBar.open(
        'Ud ha puesto ' +
          this.herramientasARevisar.length +
          ' herramienta(s) en revisión',
        'Cerrar'
      );
    } else if (
      (aAsignar != 0 && aDesasignar == 0 && aRevision > 0) ||
      (aAsignar == 0 && aDesasignar != 0 && aRevision > 0)
    ) {
      //asignar si, desasignar no, revisar si O asignar no, desasignar si, revisar si
      //hay acciones  pendientes
      this._snackBar.open(
        'Hay otras acciones pendientes antes de asignar herramientas',
        'Cerrar'
      );
    }
    //aceptar la asignacion

    // if (
    //   this.herramientasAAsignar.length > 0 &&
    //   this.herramientasADesasignar.length == 0 &&
    //   this.herramientasARevisar.length == 0
    // ) {
    //   this._snackBar.open(
    //     'Ud se ha asignado ' +
    //       this.herramientasAAsignar.length +
    //       ' herramienta(s)',
    //     'Cerrar'
    //   );
    // } else {
    //   this._snackBar.open(
    //     'No puede asignar herramientas sino completa otras acciones',
    //     'Cerrar'
    //   );
    // }

    // //aceptar la des-asignacion
    // if (
    //   this.herramientasAAsignar.length == 0 &&
    //   this.herramientasADesasignar.length > 0 &&
    //   this.herramientasARevisar.length == 0
    // ) {
    //   this._snackBar.open(
    //     'Ud se ha des-asignado ' +
    //       this.herramientasADesasignar.length +
    //       ' herramienta(s)',
    //     'Cerrar'
    //   );
    // } else {
    //   this._snackBar.open(
    //     'No puede des-asignar herramientas sino completa otras acciones',
    //     'Cerrar'
    //   );
    // }

    // //aceptar la puesta en revision
    // if (
    //   this.herramientasAAsignar.length == 0 &&
    //   this.herramientasADesasignar.length == 0 &&
    //   this.herramientasARevisar.length > 0
    // ) {
    //   this._snackBar.open(
    //     'Ud se ha puesto ' +
    //       this.herramientasARevisar.length +
    //       ' herramienta(s) para revisión',
    //     'Cerrar'
    //   );
    // } else {
    //   this._snackBar.open(
    //     'No puede poner en revisión herramientas sino completa otras acciones',
    //     'Cerrar'
    //   );
    // }
    // if (
    //   this.herramientasARevisar.length == 0 &&
    //   this.herramientasAAsignar.length == 0 &&
    //   this.herramientasADesasignar.length == 0
    // ) {
    //   this._snackBar.open('Por favor, realice alguna acción', 'Cerrar');
    // }
  }

  //cancelar y limpiar todos los arrays
  cancelar(){

    //En herramientasAMostrar tenemos el array lo que renderiza el html, con los datos que juega el usuario
    //En todasLasHerramientas tenemos un array con las herramientas en su estado inicial, tal y como vinieon del backend

    //La idea pensada es restaurar a su estado inicial todas las herramientas con esta asignacion
    //
    this.herramientasAAsignar.length = 0; //hacemos los todos los array de control:a asignar, a des-asignar y a revision 0
    this.herramientasADesasignar.length = 0;
    this.herramientasARevisar.length = 0;
    this._snackBar.open(      //mostramos la snackbar que se cancelaron las acciones
      'Ud ha cancelado todas las acciones',
      'Cerrar'
    );

    this.herramientasAMostrar=undefined; //hacemos el array a mostrar undefined para que se muestre el spinner
    this.filtro=10;
    setTimeout(() => { //hacemos un setTimeout para que el spinner se muestre 0,5 seg y hacemos el array a mostrar como al principio
      this.herramientasAMostrar=this.todasLasHerramientas;
    }, 500);

    // console.log('pincipal?',this.herramientasAMostrar[3]);
    // console.log('foto?',this.todasLasHerramientas[3]);

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
