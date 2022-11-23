import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioCrearherramientaService {

  constructor(private http: HttpClient )  {

}

comentarioNuevo(id: number, comentario: string) {

  return this.http.post( "http://127.0.0.1:8000/api/auth/crearComentario", {
    id: id,
    comentario : comentario,
  });
}
}
