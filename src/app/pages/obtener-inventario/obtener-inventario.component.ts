import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectableObservable, filter } from 'rxjs';
import { find } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identifierName } from '@angular/compiler';
import { ServicioCrearherramientaService } from 'src/app/services/servicio-crearherramienta.service';

import * as $ from 'jquery';
import { NumberFormatStyle } from '@angular/common';
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
  filtro: number = 0;
  datosUsuario: any;
  rolUsuario: any;
  cancelarOn: boolean = false;
  paraEliminar: boolean = false;
  herramientaARevision:number=0;
  herramientaABaja:number=0;
  idHerramientaAModificar:number=0;

  //array con los estados de las herramientas
  estadosHerramientas: string[] = [
    'Disponible',
    'Asignada',
    'En reparación',
    'En revisión',
    'Dada de baja',
  ];

  //array de herramientas para poner en revision
  herramientasARevisar: number[] = [];

  //herramientas a des-asignar
  herramientasADesasignar: number[] = [];

  //variable con herramienta a modificar
  modalHerramientaAModificar: boolean = false;

  modalHerramientaAEliminar: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private gestionHerramienta: ServicioCrearherramientaService
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

    console.log(this.datosUsuario);

    this.authService.obtenerHerramientas().subscribe((response: any) => {
      console.log(response);
      this.todasLasHerramientas = response.response;
      this.rolUsuario == 'ADMIN'
        ? (this.herramientasAMostrar = this.todasLasHerramientas)
        : (this.herramientasAMostrar = this.todasLasHerramientas.filter(
            (e: any) => e.estado !== 4
          ));
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
        this.rolUsuario == 'ADMIN'
          ? (this.herramientasAMostrar = this.todasLasHerramientas)
          : (this.herramientasAMostrar = this.todasLasHerramientas.filter(
              (e: any) => e.estado !== 4
            ));
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
      //Codigo para cambiale el estado a la entidad pincipal en su posicion x del aray
      // this.herramientasAMostrar[x].estado = 0;
    } else {
      this.herramientasAAsignar.push(herramienta.id);
      //Codigo para cambiale el estado a la entidad pincipal en su posicion x del aray
      // this.herramientasAMostrar[x].estado = 1;
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

      this.herramientasAMostrar = undefined; //hacemos el array a mostrar undefined para que se muestre el spinner
      this.filtro = 10;

      this.gestionHerramienta
        .asignarHerramientas(this.herramientasAAsignar, this.datosUsuario.nombre)
        .subscribe((response: any) => {
          this.authService.obtenerHerramientas().subscribe((response: any) => {
            console.log(response);
            this.todasLasHerramientas = response.response;
            this.rolUsuario == 'ADMIN'
              ? (this.herramientasAMostrar = this.todasLasHerramientas)
              : (this.herramientasAMostrar = this.todasLasHerramientas.filter(
                  (e: any) => e.estado !== 4
                ));
          });
          this.herramientasAAsignar = [];
          console.log(response);
        });
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
      this._snackBar.open('NO ha realizado ninguna acción', 'Cerrar');
    } else if (aAsignar == 0 && aDesasignar > 0 && aRevision == 0) {
      //asignar no, desasignar si, revisar no
      //aceptar desasignar
      this._snackBar.open(
        'Ud se ha des-asignado ' +
          this.herramientasADesasignar.length +
          ' herramienta(s)',
        'Cerrar'
      );

      this.herramientasAMostrar = undefined; //hacemos el array a mostrar undefined para que se muestre el spinner
      this.filtro = 10;

      this.gestionHerramienta
        .desasignarHerramientas(
          this.herramientasADesasignar,
          this.datosUsuario.nombre
        )
        .subscribe((response: any) => {
          this.authService.obtenerHerramientas().subscribe((response: any) => {
            console.log(response);
            this.todasLasHerramientas = response.response;
            this.rolUsuario == 'ADMIN'
              ? (this.herramientasAMostrar = this.todasLasHerramientas)
              : (this.herramientasAMostrar = this.todasLasHerramientas.filter(
                  (e: any) => e.estado !== 4
                ));
          });
          this.herramientasADesasignar = [];
          console.log(response);
        });
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

  }

  //cancelar y limpiar todos los arrays
  cancelar() {
    //En herramientasAMostrar tenemos el array lo que renderiza el html, con los datos que juega el usuario
    //En todasLasHerramientas tenemos un array con las herramientas en su estado inicial, tal y como vinieon del backend

    //La idea pensada es restaurar a su estado inicial todas las herramientas con esta asignacion
    //
    this.herramientasAAsignar.length = 0; //hacemos los todos los array de control:a asignar, a des-asignar y a revision 0
    this.herramientasADesasignar.length = 0;
    this.herramientasARevisar.length = 0;
    this._snackBar.open(
      //mostramos la snackbar que se cancelaron las acciones
      'Ud ha cancelado todas las acciones',
      'Cerrar'
    );

    this.herramientasAMostrar = undefined; //hacemos el array a mostrar undefined para que se muestre el spinner
    this.filtro = 10;
    setTimeout(() => {
      //hacemos un setTimeout para que el spinner se muestre 0,5 seg y hacemos el array a mostrar como al principio
      this.herramientasAMostrar = this.todasLasHerramientas;
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

  //modificar datos de herramienta
  mostrarModalModificacion(herramienta: any) {
    this.modalHerramientaAModificar = true;
    this.idHerramientaAModificar=herramienta.id;
    //animacion de formulario
    $('.formularioModificar').css('animation', 'modal 0.3s');

    //autocompletado de los datos de la herramienta
    $('#idHerramienta').val(herramienta.id);
    $('#nombreHerramientaAModificar').val(herramienta.nombre);
    $('#numeroDeSerieAModificar').val(herramienta.numero_de_serie);
    $('#marcaHerramientaAModificar').val(herramienta.marca);
    $('#responsableHerramientaAModificar').val(
      'FALTA AGREGAR ESTE CAMPO A LA BASE DE DATOS!!!!'
    );
    $('#observacionHerramientaAModificar').val(herramienta.observacion);
    //AUTOCOMPLETADO DEL ESTADO ACTUAL DE LA HERRAMIENTA
    if (herramienta.estado == 0) {
      $('#estadoHerramientaAModificar').text('Estado actual: Disponible');
    } else if (herramienta.estado == 1) {
      $('#estadoHerramientaAModificar').text('Estado actual: Asignada');
    } else if (herramienta.estado == 2) {
      $('#estadoHerramientaAModificar').text('Estado actual: En Reparación');
    } else if (herramienta.estado == 3) {
      $('#estadoHerramientaAModificar').text('Estado actual: En Revisión');
    } else if (herramienta.estado == 4) {
      $('#estadoHerramientaAModificar').text('Estado actual: Dada de baja');
    }
  }

  ocultarModalModificacion() {
    this.modalHerramientaAModificar = false;
    this.idHerramientaAModificar=0;
  }

      // codigo de estados de las herrmamientas:
    // 0: disponible
    // 1: asignada
    // 2: en reparacion
    // 3: en revision
    // 4: dada de baja

  aceptarModificacion() {
    this._snackBar.open('Datos de la herramienta modificados', 'Cerrar');

    let codigoEstado:number=0;
    let estadoAModificar:string=$('#nuevoEstado').text();
    if(estadoAModificar=='Disponible'){
      codigoEstado=0;
    }else if(estadoAModificar=='Asignada'){
      codigoEstado=1;
    }else if(estadoAModificar=='En reparación'){
      codigoEstado=2;
    }else if(estadoAModificar=='En revisión'){
      codigoEstado=3;
    }else if(estadoAModificar=='Dada de baja'){
      codigoEstado=4;
    }
    this.modalHerramientaAModificar = false;
    this.paraEliminar = false;
    this.herramientasAMostrar = undefined; //hacemos el array a mostrar undefined para que se muestre el spinner
    this.filtro = 10;

        this.gestionHerramienta
      .modificarHerramienta(
        $('#nombreHerramientaAModificar').val(),
        $('#numeroDeSerieAModificar').val(),
        $('#marcaHerramientaAModificar').val(),
        $('#responsableHerramientaAModificar').val(),
        $('#observacionHerramientaAModificar').val(),
        codigoEstado,
        this.idHerramientaAModificar,
      )
      .subscribe((response: any) => {
        this.authService.obtenerHerramientas().subscribe((response: any) => {
          console.log(response);
          this.todasLasHerramientas = response.response;
          this.idHerramientaAModificar=0;
          this.rolUsuario == 'ADMIN'
            ? (this.herramientasAMostrar = this.todasLasHerramientas)
            : (this.herramientasAMostrar = this.todasLasHerramientas.filter(
                (e: any) => e.estado !== 4
              ));
        });
        console.log(response);
      });


    /* Cada campo en el formulario de edicion de herramienta
    tiene un ID, con jquery accedemos a cada campo por medio de su ID y obtenemos su nuevo
    valor con .val */

    /* Ahora que tenemos todos los datos, mandamos al backend los mismos */



  }

  //modal de eliminacion

  mostrarModalEliminacion(herramienta: any) {
    this.modalHerramientaAEliminar = true;
    this.paraEliminar = true;
    this.herramientaABaja=herramienta.id;
    //animacion de formulario
    $('.cardBajaHerramienta').css('animation', 'modal 0.3s');
    $('#herramientaAEliminar').text(
      'Ud está a punto de dar de baja esta herramienta: ' +
        herramienta.nombre +
        ' ' +
        herramienta.numero_de_serie
    );
  }

  ocultarModalEliminacion() {
    this.modalHerramientaAEliminar = false;
    this.paraEliminar = false;
    this.herramientaABaja=0;
  }

  aceptarEliminacion() {
    this._snackBar.open('Ud ha dado de baja una herramienta', 'Cerrar');
    setTimeout(() => {
      this.modalHerramientaAEliminar = false;
    }, 500);
    this.paraEliminar = false;

    this.herramientasAMostrar = undefined; //hacemos el array a mostrar undefined para que se muestre el spinner
    this.filtro = 10;
    this.gestionHerramienta
    .bajaHerramienta(
      this.herramientaABaja,
      $("#observacionHerramientaABaja").val(),
      this.datosUsuario.nombre
    )
    .subscribe((response: any) => {
      this.authService.obtenerHerramientas().subscribe((response: any) => {
        console.log(response);
        this.todasLasHerramientas = response.response;
        this.rolUsuario == 'ADMIN'
          ? (this.herramientasAMostrar = this.todasLasHerramientas)
          : (this.herramientasAMostrar = this.todasLasHerramientas.filter(
              (e: any) => e.estado !== 4
            ));
      });
      console.log(response);
    });
  }

  //modal de revision

  mostrarModalRevision(herramienta: any) {
    this.modalHerramientaAEliminar = true;
    //animacion de formulario
    $('.cardBajaHerramienta').css('animation', 'modal 0.3s');
    $('#herramientaAEliminar').text(
      'Ud está a punto de poner esta herramienta en revision: ' +
        herramienta.nombre +
        ' ' +
        herramienta.numero_de_serie
    );
    this.herramientaARevision=herramienta.id;
    this.paraEliminar = false;
  }

  ocultarModalRevision() {
    this.modalHerramientaAEliminar = false;
    this.paraEliminar = false;
    this.herramientaARevision=0;
  }

  aceptarRevision() {
    this._snackBar.open('Ud a puesto una herramienta en revision', 'Cerrar');
    setTimeout(() => {
      this.modalHerramientaAEliminar = false;
    }, 500);
    this.paraEliminar = false;
    this.herramientasAMostrar = undefined; //hacemos el array a mostrar undefined para que se muestre el spinner
    this.filtro = 10;
    this.gestionHerramienta
    .revisionHerramienta(
      this.herramientaARevision,
      $("#observacionHerramientaARevision").val(),
      this.datosUsuario.nombre
    )
    .subscribe((response: any) => {
      this.authService.obtenerHerramientas().subscribe((response: any) => {
        console.log(response);
        this.todasLasHerramientas = response.response;
        this.herramientaARevision=0;
        this.rolUsuario == 'ADMIN'
          ? (this.herramientasAMostrar = this.todasLasHerramientas)
          : (this.herramientasAMostrar = this.todasLasHerramientas.filter(
              (e: any) => e.estado !== 4
            ));
      });
      console.log(response);
    });
  }

  //alta de herramientas
  irAltaHerramienta() {
    this.router.navigate(['crear-herramienta']);
  }
}

