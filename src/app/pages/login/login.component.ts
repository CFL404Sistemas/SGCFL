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
loginform: FormGroup | any;
  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, public Login: AuthService, private router: Router) { }

  ngOnInit(): void {
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

){this._snackBar.open('Pedir contraseña en dirección', 'Cerrar');}

onlogin(){



  this.Login.login(this.loginform.value.dni, this.loginform.value.password).subscribe(
    (response: any) => {


      localStorage.setItem('isLogged', 'true')


      this.router.navigate(["home-admin"]);

    },
    (error) => {
      console.log(error);
      this._snackBar.open('ERROR', 'Cerrar');

    },
  );




}
}


