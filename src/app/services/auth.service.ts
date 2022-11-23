import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient )  {

  }
  login(dni: string, password: string) {

    return this.http.post( "http://127.0.0.1:8000/api/auth/login", {
      dni: dni,
      password: password
    });
  }

  obtenerHerramientas(){
    return this.http.get('http://127.0.0.1:8000/api/obtener-herramientas');
  }


  Registrar(dni: string, password: string, nombre: string, cargo: string, telefono: number, email: string, ) {

    return this.http.post( "http://127.0.0.1:8000/api/authServices/register", {
      password: password,
      nombre: nombre,
      cargo: cargo,
      telefono: telefono,
      email: email,
      dni:dni

    });
    });}

    MostrarHistorial(){
      return this.http.get('http://127.0.0.1:8000/api/historial');
  }


  crearheramienta(nombre: string, marca: string, NrodeSerie:string, observacion:string, imagen:string, estado:string) {

    return this.http.post( "http://127.0.0.1:8000/api/herramienta/crearHerramienta", {
      nombre: nombre ,
      marca: marca,
      numero_de_serie: NrodeSerie,
      observacion: observacion,
      img: imagen,
      estado: estado,


    });

  }

}

