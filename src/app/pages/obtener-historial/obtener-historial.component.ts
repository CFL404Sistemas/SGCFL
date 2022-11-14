import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-obtener-historial',
  templateUrl: './obtener-historial.component.html',
  styleUrls: ['./obtener-historial.component.scss']
})
export class ObtenerHistorialComponent implements OnInit {
  displayedColumns: string[] = ['number','name', 'accion', 'symbol','section','comentario'];
dataSource: any[]=[]
  ElementosAMostrar: any;
  filtros: any[] = [
    {value: 'nserie-0', viewValue: 'Numero de Serie'},
    {value: 'nombreHerramienta-1', viewValue: 'Herramienta'},
    {value: 'disponible-2', viewValue: 'Disponibles'},
    {value: 'asignada-3', viewValue: 'Asignadas'},
    {value: 'reparacion-4', viewValue: 'En Reparacion'},
    {value: 'revision-5', viewValue: 'En Revision'},
    {value: 'baja-6', viewValue: 'Dadas de baja'},
    {value: 'responsable-7', viewValue: 'Responsable'},


  ];
  resultadosFiltrados: any[]=[];
  busquedaUsuario:any
  fechaUsuario: any
  nuevaFecha: any
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.MostrarHistorial().subscribe((response:any)=>{
      console.log(response)
      this.ElementosAMostrar=response.response;
      this.dataSource= this.ElementosAMostrar;
      console.log(this.ElementosAMostrar[0].created_at.split("T21:45:27.000000Z").join("") );

    })

  }
  filtroSeleccionado(filtro: string){
    console.log(filtro)




  }
  onKey(event:any) {
    console.log(event.target.value)
    this.busquedaUsuario=event.target.value;
    console.log('aca estoy', this.busquedaUsuario)

    this.dataSource = this.ElementosAMostrar.filter((element: { nserie: number; nombre: string; responsable: string; movimiento: string}) => {
      // 👇️ using AND (&&) operator
      return element.nserie == this.busquedaUsuario || element.nombre == this.busquedaUsuario || element.movimiento == this.busquedaUsuario || element.responsable == this.busquedaUsuario
    });


    if (event.target.value == 0 || event.target.value === "" ||event.target.value == '' || event.target.value == undefined || event.target.value == null ){
      this.dataSource= this.ElementosAMostrar;

    }

  }
  dateSeleccionado(event:any){
    console.log(event.target.value)
    var fecha= new Date(event.target.value)
    this.nuevaFecha= fecha.toISOString().slice(0,10)
    console.log(this.nuevaFecha)
    this.dataSource = this.ElementosAMostrar.filter((element: { created_at: any}) => {
      // 👇️ using AND (&&) operator

      var x= element.created_at.slice(0,10)

      return x == this.nuevaFecha
    });
    if (event.target.value == 0 || event.target.value === "" ||event.target.value == '' || event.target.value == undefined || event.target.value == null ){
      this.dataSource= this.ElementosAMostrar;

    }

  }
}


Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export interface PeriodicElement {
  number : number;
  name: string;
  accion: string;
  symbol: string;
  section: string;
  comentario: string;
}
const ELEMENT_DATA: PeriodicElement[] = []

