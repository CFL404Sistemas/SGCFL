import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crearherramienta',
  templateUrl: './crearherramienta.component.html',
  styleUrls: ['./crearherramienta.component.scss'],
})
export class CrearherramientaComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted = false;
  esNoDisponible: string = 'Disponible';
  limitExceeded: boolean = false;
  previewPicture: any;
  constructor(private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private AuthServices: AuthService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      nroSerie: ["", [Validators.required]],
      observacion: ["", [Validators.required]],
      Marca: ["", [Validators.nullValidator]],
    });
  }
  get formControl() {
    return this.loginForm.controls;
  }
  crearherramientas() {
    this.AuthServices.crearheramienta(
      this.loginForm.value.nombre,
      this.loginForm.value.Marca,
      this.loginForm.value.nroSerie,
      this.loginForm.value.observacion,
      this.previewPicture,
      this.esNoDisponible
    ).subscribe(
      (Response: any) => {
        console.log(Response);
        this._snackBar.open('Herramienta ' +this.loginForm.value.nombre+ ' Creada Correctamente.','Cerrar');

        this.loginForm.reset()
        this.previewPicture = '';

      },
      (error) => {


        this._snackBar.open('ERROR volve a intentar','Cerrar');
      }
    );
  }
  loadImageFromDevice(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

      if (blob.size > 1500000) {
        this.limitExceeded = true;
      } else {
        this.limitExceeded = false;
      }

      this.toBase64(blob);
    };

    reader.onerror = (error) => {
      //handle errors
    };
  }
  toBase64(blob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      compressImage(reader.result, 225, 225).then((compressed) => {
        this.previewPicture =
          'data:image/jpg;base64,' +
          (
            this.domSanitizer.bypassSecurityTrustResourceUrl(
              (compressed as string).split(',')[1]
            ) as any
          ).changingThisBreaksApplicationSecurity;
      });
    };
  }
}
function compressImage(src: any, newX: any, newY: any) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = newX;
      elem.height = newY;
      const ctx = elem.getContext('2d') as any;
      ctx.drawImage(img, 0, 0, newX, newY);
      const data = ctx.canvas.toDataURL();
      res(data);
    };
    img.onerror = (error) => rej(error);
  });
}
