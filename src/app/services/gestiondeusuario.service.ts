import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GestiondeusuarioService {

  constructor(private http: HttpClient )

   {}

   obtenerusuarios(){
    return this.http.get("http://127.0.0.1:8000/api/usuarios/obtenerUsuarios");

     }

     borrar(idusuarios:any) {

      return this.http.post( "http://127.0.0.1:8000/api/usuarios/borrarusuarios", {
        idusuarios:idusuarios
      });
    }



}
