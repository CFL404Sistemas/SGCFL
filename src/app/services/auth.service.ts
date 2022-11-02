import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


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
  Registrar(dni: string, password: string, nombre: string, Cargo: string, telefono: number, email: string, ) {

    return this.http.post( "http://127.0.0.1:8000/api/auth/register", {
      dni: dni,
      password: password,
      nombre: nombre,
      Cargo: Cargo,
      telefono: telefono,
      email: email,

    });}
}
