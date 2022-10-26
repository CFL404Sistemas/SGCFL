import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-crearherramienta',
  templateUrl: './crearherramienta.component.html',
  styleUrls: ['./crearherramienta.component.scss']
})

export class CrearherramientaComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted = false;
  esNoDisponible:string='Disponible';
  limitExceeded:boolean=false;
  previewPicture:any;
  constructor(private formBuilder: FormBuilder, private domSanitizer: DomSanitizer) { }

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
loadImageFromDevice(event:any){
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);
  reader.onload = () => {

    let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

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

    compressImage(reader.result, 225, 225).then(compressed => {

      this.previewPicture = 'data:image/jpg;base64,' + (this.domSanitizer.bypassSecurityTrustResourceUrl((compressed as string).split(',')[1]) as any).changingThisBreaksApplicationSecurity

    })
  };
}
}
function compressImage(src:any, newX:any, newY:any) {
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
    }
    img.onerror = error => rej(error);
  })
}
