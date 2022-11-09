import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionperfilComponent } from './edicionperfil.component';

describe('EdicionperfilComponent', () => {
  let component: EdicionperfilComponent;
  let fixture: ComponentFixture<EdicionperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionperfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
