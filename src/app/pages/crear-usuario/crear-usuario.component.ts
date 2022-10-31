import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']

})
export class CrearUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup | any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formularioUsuario = this.formBuilder.group({
      nombre: ["", [ Validators.required]],
      nroSerie: ["" , [Validators.required]]
    });


  }

  get formControl(){
    return this.formularioUsuario.controls;
   };


  crearUsuario(){




  }

}

