import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { NonNullableFormBuilder } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }
  login(dni: string, password: string) {

    return this.http.post( "http://127.0.0.1:8000/api/auth/login", {
      dni: dni,
      password: password
    });
  }
  crearheramienta(nombre: string, marca: string, NrodeSerie:string, observacion:string, imagen:string, estado:string) {

    return this.http.post( "http://127.0.0.1:8000/api/herramienta/crearHerramienta", {
      nombre: nombre ,
      marca: marca,
      NrodeSerie: NrodeSerie,
      observacion: observacion,
      imagen: imagen,
      estado: estado,


    });
  }
}
