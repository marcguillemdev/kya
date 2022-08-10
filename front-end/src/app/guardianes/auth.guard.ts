import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, lastValueFrom, firstValueFrom } from 'rxjs';
import { PagesId } from '../constantes/pages';
import { siteConstants } from '../constantes/site-constants';
import { AuthData } from '../modelos/auth-model';
import { AuthService } from '../servicios/auth/auth.service';
import { UpdateService } from '../servicios/update-service/update.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private updateService: UpdateService,
    private router: Router,
    private authService: AuthService
  ) {

  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      let authData: AuthData = await firstValueFrom(this.updateService.authData);
      // IF authdata is null its because checkAuth method is not fired yet
      if(authData === null) {
        await this.authService.checkAuth();
        this.updateService.emitCheckAuthMethodFired(true);
        this.updateService.checkAuthMethodFired.complete();
        authData = await firstValueFrom(this.updateService.authData);
      }
      if(authData !== null && authData.token !== "" && authData.token !== undefined) {
        //console.log(authData);
        let resultado = this.authService.getRoles(authData.token);
        //console.log("Admin guard: ", resultado);
        if(resultado) {
          return Promise.resolve(true);
        } else {
          this.router.navigate([PagesId.LOGIN]);
          //console.log("navigating to login");
          return Promise.resolve(false);
        }
      } else {
        this.router.navigate([PagesId.LOGIN]);
        //console.log("navigating to login");
        return Promise.resolve(false);
      }
  }



}
