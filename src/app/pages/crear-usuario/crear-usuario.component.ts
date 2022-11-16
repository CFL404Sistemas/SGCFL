import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "src/app/services/auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {GestiondeusuarioService} from "../../services/gestiondeusuario.service";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']




})
export class CrearUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup | any;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
TodoslosUsuarios:any;
arrayIDUsuarios: any = [];
arrayUsuariosAModificar : any = [];
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

  borrarUsuarios(){


    this.GestiondeusuarioService.borrar(this.arrayIDUsuarios).subscribe(
      (response: any) => {

        console.log(response);
        this.quitarUsuariosArray();


      },
      (error) => {
        console.log(error);


      },
    );
  }

  quitarUsuariosArray(){

    console.log(this.TodoslosUsuarios); /*  Array de usuarios */
    console.log(this.arrayIDUsuarios);  /* Array con los id de los usuarios eliminados */
/* Consigna: Hay que cruzar los dos array, tal que: se quiten del primer array, aquellos usuarios que se encuentren en el segundo (validando ID) */
    for (let i in this.TodoslosUsuarios){

      for (let j in this.arrayIDUsuarios){



        if(this.TodoslosUsuarios[i].id == this.arrayIDUsuarios[j]){

          this.TodoslosUsuarios.splice(i,1);

        }

        console.log(this.TodoslosUsuarios[i]);
        console.log(this.arrayIDUsuarios[j]);

      }
    }

  }

  usuarioSeleccionado(usuarioElegido: any ){

    this.arrayIDUsuarios.push(usuarioElegido);

    console.log(this.arrayIDUsuarios);



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


  nuevaContra(datosUsuario: any, eventoNuevaContra: any){


    /* Una variable temporal  */
    var temporal = {
      idUsuario: datosUsuario.id,
      nuevaContra:  eventoNuevaContra.target.value
    };

    this.arrayUsuariosAModificar.push(temporal);



  }


ObtenerUsuario(){

  this.GestiondeusuarioService.obtenerusuarios().subscribe(
    (response: any) => {

      console.log('Esto me responde el banckend',response.response_uno);
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
Contranueva(){

  console.log(this.arrayUsuariosAModificar);

  this.GestiondeusuarioService.Contranueva(this.arrayUsuariosAModificar).subscribe(
    (response: any) => {

      console.log('llamado exitoso',response);
      this._snackBar.open('Se ha modificado la contraseña', 'Cerrar');

    },
    (error) => {
      console.log(error);

    },
  );

  }

}

