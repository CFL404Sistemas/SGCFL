import { TestBed } from '@angular/core/testing';

import { ObtenerHerramientasService } from './obtener-herramientas.service';

describe('ObtenerHerramientasService', () => {
  let service: ObtenerHerramientasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerHerramientasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
