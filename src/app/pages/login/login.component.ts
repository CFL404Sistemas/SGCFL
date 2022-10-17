import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginform: FormGroup | any;
  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder) { }

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

  alert(this.loginform.value.dni)
  alert(this.loginform.value.password)

}
}


