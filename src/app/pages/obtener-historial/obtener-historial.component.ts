import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-obtener-historial',
  templateUrl: './obtener-historial.component.html',
  styleUrls: ['./obtener-historial.component.scss']
})
export class ObtenerHistorialComponent implements OnInit {
  displayedColumns: string[] = ['number','name', 'accion', 'symbol','section','comentario'];
dataSource: any[]=[]
  ElementosAMostrar: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.MostrarHistorial().subscribe((response:any)=>{
      console.log(response)
      this.ElementosAMostrar=response.response;
      this.dataSource= this.ElementosAMostrar;
      console.log(this.ElementosAMostrar[0].created_at.split("T21:45:27.000000Z").join("") );

    })

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


