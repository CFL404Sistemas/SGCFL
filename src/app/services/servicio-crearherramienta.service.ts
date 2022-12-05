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

  asignarHerramientas(arrConHerramientasAsignar: any, nombreUsuario: any) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarAsignacion',
      {
        arrConHerramientasAsignar: arrConHerramientasAsignar,
        nombreUsuario: nombreUsuario,
      }
    );
  }

  desasignarHerramientas(arrConHerramientasDesasignar: any, nombreUsuario: any) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarDesasignacion',
      {
        arrConHerramientasDesasignar: arrConHerramientasDesasignar,
        nombreUsuario: nombreUsuario,
      }
    );
  }

  revisionHerramienta(
    idHerramienta: any,
    observacionHerramienta: any,
    nombreUsuario: any
  ) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarRevision',
      {
        idHerramienta: idHerramienta,
        observacionHerramienta: observacionHerramienta,
        nombreUsuario: nombreUsuario,
      }
    );
  }

  bajaHerramienta(
    idHerramienta: any,
    observacionHerramienta: any,
    nombreUsuario: any
  ) {
    return this.http.post(
      'http://127.0.0.1:8000/api/herramienta/gestionarBaja',
      {
        idHerramienta: idHerramienta,
        observacionHerramienta: observacionHerramienta,
        nombreUsuario: nombreUsuario,
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
