import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearherramientaComponent } from './crearherramienta.component';

describe('CrearherramientaComponent', () => {
  let component: CrearherramientaComponent;
  let fixture: ComponentFixture<CrearherramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearherramientaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearherramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
