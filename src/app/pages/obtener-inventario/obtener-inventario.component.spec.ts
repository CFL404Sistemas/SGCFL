import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerInventarioComponent } from './obtener-inventario.component';

describe('ObtenerInventarioComponent', () => {
  let component: ObtenerInventarioComponent;
  let fixture: ComponentFixture<ObtenerInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObtenerInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
