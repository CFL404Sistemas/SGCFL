import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-crearherramienta',
  templateUrl: './crearherramienta.component.html',
  styleUrls: ['./crearherramienta.component.scss']
})

export class CrearherramientaComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted = false;
  esNoDisponible:string='Disponible';
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { this.loginForm = this.formBuilder.group({
    nombre: ["", [ Validators.required]],
    nroSerie: ["" , [Validators.required]]
  });
  }
  get formControl(){
    return this.loginForm.controls;
   };
   onLogin(){}
;
}
