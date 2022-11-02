import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "src/app/services/auth.service";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']

})
export class CrearUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService) { }

  ngOnInit(): void {

    this.formularioUsuario = this.formBuilder.group({
      nombre: ["", [ Validators.required]],
      nroSerie: ["" , [Validators.required]],
      DNI: ["" , [Validators.required]],
      Contraseña: ["" , [Validators.required]],
      Cargo: ["" , [Validators.required]],

    });


  }

  get formControl(){
    return this.formularioUsuario.controls;
   };


  crearUsuario(){

    this.AuthService.Registrar(this.formularioUsuario.value.dni, this.formularioUsuario.value.password, this.formularioUsuario.value.nombre, this.formularioUsuario.value.Cargo, this.formularioUsuario.value.telefono, this.formularioUsuario.value.email).subscribe(
      (response: any) => {

        console.log(response);
        alert('BACKEND RESPONDIO BIEN');


      },
      (error) => {
        console.log(error);
        alert('BACKEND RESPONDIO MAL');

      },
    );

  };







}

