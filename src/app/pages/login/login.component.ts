import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

mostrarModal: boolean=true;

loginform: FormGroup | any;
mostrarSpinner: boolean = false;
  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, public Login: AuthService, private router: Router) { }

  ngOnInit(): void {

    if(JSON.parse(localStorage.getItem('aceptoAcuerdo')!)==true){
      this.mostrarModal=false;
    }

    this.loginform = this.formBuilder.group({
      dni: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
        ]
      ]
    });

  }
ayuda (

){

  this._snackBar.open('Pedir contraseña en dirección', 'Cerrar');}


aceptar(){
  localStorage.setItem('aceptoAcuerdo', 'true')
  this.mostrarModal = false;

}


onlogin(){

this.mostrarSpinner = true;

  this.Login.login(this.loginform.value.dni, this.loginform.value.password).subscribe(
    (response: any) => {
    console.log(response);

        /*En un login exitoso, definimos en el localstorage, que el usuario esta loggeado  */
          localStorage.setItem('isLogged', 'true')
          /* En un login exitoso, definimos en el localstorage los datos de usuario que me devuelve en backend
          stringify se usa para convertir objecto (los datos del usuario, un registro) en texto
          El local storage solo permite almacenar texto*/
          localStorage.setItem('userData', JSON.stringify(response.response))

          this.router.navigate(["home-admin"]);

        },
        (error) => {
          console.log(error);
          this._snackBar.open('DNI o Contraseña Incorrecta', 'Cerrar');
          this.mostrarSpinner = false;
        },
      );




}

modalOpen(){
  this.mostrarModal=true;
}
}


