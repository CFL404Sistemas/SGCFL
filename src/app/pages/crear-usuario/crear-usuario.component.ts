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
desactivarBOTON : boolean = false;
desactivarbotonpass : boolean =true;
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
    console.log('Viendo si mandamos IDS',this.arrayIDUsuarios);
    if(this.arrayIDUsuarios.length ==0 ){ this._snackBar.open('Seleccionar al menos un usuario para borrar.', 'Cerrar');return false;}
    this.desactivarBOTON = true;

    this.GestiondeusuarioService.borrar(this.arrayIDUsuarios).subscribe(
      (response: any) => {

        console.log(response);window.location.reload();



        this._snackBar.open('Los usuarios se han eliminado correctamente.', 'Cerrar');

        this.desactivarBOTON = false;

      },
      (error) => {
        console.log(error);
        this.desactivarBOTON = false;


      },
    );
    return true;
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

    /*  Estas tres formas de borrar, ejecutamos las 3*/
    this.arrayIDUsuarios.length = 0; /* Le digo que su longitud sea 0 */
    this.arrayIDUsuarios = []; /* Lo vuelvo a definir como array en 0 */
    while(this.arrayIDUsuarios.length){ /* Ya fue, recorro todo el array y voy sacando elemento por elemento */
      this.arrayIDUsuarios.pop();
    }

  }

  usuarioSeleccionado(usuarioElegido: any){


    /* Evaluar si ya se encuentra en el array, sacarlo, caso contrario pushearlo. */
    /* esta accion es cuando no esta en el array */

    console.log(this.arrayIDUsuarios.includes(usuarioElegido));
    if(!this.arrayIDUsuarios.includes(usuarioElegido)){
      this.arrayIDUsuarios.push(usuarioElegido);



    }else{


      this.arrayIDUsuarios = this.arrayIDUsuarios.filter((usuarioEnArray: any) =>  usuarioEnArray !== usuarioElegido);

    }
    console.log('Este array va a tener los ID de los usuarios a eliminar',this.arrayIDUsuarios);




  }


  get formControl(){
    return this.formularioUsuario.controls;
   };


  crearUsuario(){

    this.AuthService.Registrar(this.formularioUsuario.value.DNI, this.formularioUsuario.value.password, this.formularioUsuario.value.nombre, this.formularioUsuario.value.Cargo, this.formularioUsuario.value.telefono, this.formularioUsuario.value.email).subscribe(
      (response: any) => {

        console.log(response);
        this._snackBar.open('Se ha creado un usuario.', 'Cerrar');
        this.formularioUsuario.reset();
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Error en la creación de usuario.', 'Cerrar');

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

this.desactivarbotonpass = false

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
if(this.arrayUsuariosAModificar.length ==0){
  this._snackBar.open('Debe de cambiar al menos una contraseña', 'Cerrar');

  return false


}
  this.GestiondeusuarioService.Contranueva(this.arrayUsuariosAModificar).subscribe(
    (response: any) => {

      console.log('llamado exitoso',response);
      this._snackBar.open('Se ha modificado la contraseña', 'Cerrar');

    },
    (error) => {
      console.log(error);

    },
  );
  return true
  }

}

