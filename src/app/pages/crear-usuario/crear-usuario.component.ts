import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "src/app/services/auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {GestiondeusuarioService} from "src/app/services/gestiondeusuario.service";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']




})
export class CrearUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup | any;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
TodoslosUsuarios:any;

  constructor(private GestiondeusuarioService: GestiondeusuarioService, private formBuilder: FormBuilder, private AuthService: AuthService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.formularioUsuario = this.formBuilder.group({
      nombre: ["", [ Validators.required]],
      nroSerie: ["" , [Validators.required]],
      DNI: ["" , [Validators.required]],
      password: ["" , [Validators.required]],
      Cargo: ["" , [Validators.required]],
      telefono: ["" , []],
      email: ["" , []],


    });


  }


  get formControl(){
    return this.formularioUsuario.controls;
   };


  crearUsuario(){

    this.AuthService.Registrar(this.formularioUsuario.value.DNI, this.formularioUsuario.value.password, this.formularioUsuario.value.nombre, this.formularioUsuario.value.Cargo, this.formularioUsuario.value.telefono, this.formularioUsuario.value.email).subscribe(
      (response: any) => {

        console.log(response);
        this._snackBar.open('Se ha creado un usuario', 'Cerrar');
        this.formularioUsuario.reset();
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Error en la creación de usuario', 'Cerrar');

      },
    );

  };


ObtenerUsuario(){

  this.GestiondeusuarioService.obtenerusuarios().subscribe(
    (response: any) => {

      console.log(response.response_uno);
      this.TodoslosUsuarios=response.response_uno

    },
    (error) => {
      console.log(error);


    },
  );


}

onTabChanged($event: any) {

  if($event.index ==1){
    this.ObtenerUsuario();
  }

}


}
