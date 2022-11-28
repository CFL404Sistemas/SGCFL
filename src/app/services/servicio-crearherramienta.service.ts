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


asignarHerramientas(arrConHerramientasAsignar: any, arrConHerramientasADesasignar: any) {

  return this.http.post( "http://127.0.0.1:8000/api/herramienta/gestionarAsignacion", {
    arrConHerramientasAsignar: arrConHerramientasAsignar,
    arrConHerramientasADesasignar: arrConHerramientasADesasignar
  });
}


modificarHerramienta(nombreHerramientaAModificar: any,
  numeroDeSerieAModificar: any,
  marcaHerramientaAModificar: any,
  responsableHerramientaAModificar: any,
  observacionHerramientaAModificar: any,
  estadoHerramientaAModificar: any,
  idHerramienta: any) {

  return this.http.post( "http://127.0.0.1:8000/api/herramienta/modificarHerramienta", {
    nombreHerramientaAModificar: nombreHerramientaAModificar,
    numeroDeSerieAModificar: numeroDeSerieAModificar,
    marcaHerramientaAModificar: marcaHerramientaAModificar,
    responsableHerramientaAModificar: responsableHerramientaAModificar,
    observacionHerramientaAModificar: observacionHerramientaAModificar,
    estadoHerramientaAModificar: estadoHerramientaAModificar,
    idHerramienta: idHerramienta,




  });
}

}
