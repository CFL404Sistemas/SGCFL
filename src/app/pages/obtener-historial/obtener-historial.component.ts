import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obtener-historial',
  templateUrl: './obtener-historial.component.html',
  styleUrls: ['./obtener-historial.component.scss']
})
export class ObtenerHistorialComponent implements OnInit {
  displayedColumns: string[] = ['name', 'accion', 'symbol','section'];
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
  name: string;
  accion: string;
  symbol: string;
  section: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Taladro(2134341)', accion: 'Disponible' , symbol: '12/04/2022', section:'Nicolas A'},
  { name: 'Amoladora', accion: 'No Disponible' , symbol: '13/05/2022', section:'Nicolas A'},
  { name: 'Martillo', accion: 'Disponible' , symbol: '16/06/2022', section:'Nicolas A'},
  { name: 'Destornillador', accion: 'Disponible' , symbol: '16/07/2022', section:'Nicolas A'},
  { name: 'Taladro', accion: 'Disponible'  , symbol: '12/04/2022', section:'Nicolas A'},
  { name: 'Amoladora', accion: 'Disponible' , symbol: '13/05/2022', section:'Nicolas A'},
  { name: 'Martillo', accion: 'No Disponible' , symbol: '16/06/2022', section:'Nicolas A'},
  { name: 'Destornillador', accion: 'Disponible' , symbol: '16/07/2022', section:'Nicolas A'},
  { name: 'Taladro', accion: 'Disponible'  , symbol: '12/04/2022', section:'Nicolas A'},
  { name: 'Amoladora', accion: ' No Disponible' , symbol: '13/05/2022', section:'Nicolas A'},
  { name: 'Martillo', accion: 'Disponible' , symbol: '16/06/2022', section:'Nicolas A'},
  { name: 'Destornillador', accion: 'Disponible' , symbol: '16/07/2022', section:'Nicolas A'},
  { name: 'Taladro', accion: 'No Disponible'  , symbol: '12/04/2022', section:'Nicolas A'},
  { name: 'Amoladora', accion: 'Disponible' , symbol: '13/05/2022', section:'Nicolas A'},
  { name: 'Martillo', accion: 'Disponible' , symbol: '16/06/2022', section:'Nicolas A'},
  { name: 'Destornillador', accion: 'Disponible' , symbol: '16/07/2022', section:'Nicolas A'},
];



