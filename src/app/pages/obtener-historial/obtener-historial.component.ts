import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obtener-historial',
  templateUrl: './obtener-historial.component.html',
  styleUrls: ['./obtener-historial.component.scss']
})
export class ObtenerHistorialComponent implements OnInit {
  displayedColumns: string[] = ['number','name', 'accion', 'symbol','section'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
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
}
const ELEMENT_DATA: PeriodicElement[] = [
  {number: 2221, name: 'Taladro', accion: 'Disponible' , symbol: '12/04/2022', section:'Nicolas A'},
  {number: 2222, name: 'Amoladora', accion: 'No Disponible' , symbol: '13/05/2022', section:'Nicolas A'},
  {number: 2223, name: 'Martillo', accion: 'Disponible' , symbol: '16/06/2022', section:'Nicolas A'},
  {number: 2224, name: 'Destornillador', accion: 'Disponible' , symbol: '16/07/2022', section:'Nicolas A'},
];



