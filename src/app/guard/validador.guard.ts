import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class ValidadorGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('se ejecuta guard',localStorage.getItem('isLogged'));

      if(localStorage.getItem('isLogged')){
        return true;
      }else{
        this.router.navigate(["login"]);
      }
      return false
  }

}
