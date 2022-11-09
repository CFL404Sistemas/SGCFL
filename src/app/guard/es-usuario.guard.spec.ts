import { TestBed } from '@angular/core/testing';

import { EsUsuarioGuard } from './es-usuario.guard';

describe('EsUsuarioGuard', () => {
  let guard: EsUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EsUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
