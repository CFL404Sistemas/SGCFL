import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root',
})
export class ServicioCrearherramientaService {
  constructor(private http: HttpClient) {}

  comentarioNuevo(id: number, comentario: string) {
    return this.http.post('http://127.0.0.1:8000/api/auth/crearComentario', {
      id: id,
      comentario: comentario,
    });
  }

  asignarHerramientas(arrConHerramientasAsignar: any, idUsuario: any) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarAsignacion',
      {
        arrConHerramientasAsignar: arrConHerramientasAsignar,
        idUsuario: idUsuario,
      }
    );
  }

  desasignarHerramientas(arrConHerramientasDesasignar: any, idUsuario: any) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarDesasignacion',
      {
        arrConHerramientasDesasignar: arrConHerramientasDesasignar,
        idUsuario: idUsuario,
      }
    );
  }

  revisionHerramienta(
    idHerramienta: any,
    observacionHerramienta: any,
    idUsuario: any
  ) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarRevision',
      {
        idHerramienta: idHerramienta,
        observacionHerramienta: observacionHerramienta,
        idUsuario: idUsuario,
      }
    );
  }

  bajaHerramienta(
    idHerramienta: any,
    observacionHerramienta: any,
    idUsuario: any
  ) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarBaja',
      {
        idHerramienta: idHerramienta,
        observacionHerramienta: observacionHerramienta,
        idUsuario: idUsuario,
      }
    );
  }

  modificarHerramienta(
    nombreHerramientaAModificar: any,
    numeroDeSerieAModificar: any,
    marcaHerramientaAModificar: any,
    responsableHerramientaAModificar: any,
    observacionHerramientaAModificar: any,
    estadoHerramientaAModificar: any,
    idHerramienta: any
  ) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/modificarHerramienta',
      {
        nombreHerramientaAModificar: nombreHerramientaAModificar,
        numeroDeSerieAModificar: numeroDeSerieAModificar,
        marcaHerramientaAModificar: marcaHerramientaAModificar,
        responsableHerramientaAModificar: responsableHerramientaAModificar,
        observacionHerramientaAModificar: observacionHerramientaAModificar,
        estadoHerramientaAModificar: estadoHerramientaAModificar,
        idHerramienta: idHerramienta,
      }
    );
  }
}
