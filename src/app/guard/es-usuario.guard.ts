import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsUsuarioGuard implements CanLoad {
  constructor() {

    console.log('se ejecuta guard',localStorage.getItem('isLogged'));




  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



     console.log('se ejecuta guard',localStorage.getItem('isLogged'));






     return false;






  }








}