import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-edicionperfil',
  templateUrl: './edicionperfil.component.html',
  styleUrls: ['./edicionperfil.component.scss']
})
export class EdicionperfilComponent implements OnInit {
  previewPicture: any;
  constructor( private router: Router) { }

  ngOnInit(): void {
    
  }

}
