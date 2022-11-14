import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerHistorialComponent } from './obtener-historial.component';

describe('ObtenerHistorialComponent', () => {
  let component: ObtenerHistorialComponent;
  let fixture: ComponentFixture<ObtenerHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerHistorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
