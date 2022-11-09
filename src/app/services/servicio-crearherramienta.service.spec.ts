import { TestBed } from '@angular/core/testing';

import { ServicioCrearherramientaService } from './servicio-crearherramienta.service';

describe('ServicioCrearherramientaService', () => {
  let service: ServicioCrearherramientaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCrearherramientaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
