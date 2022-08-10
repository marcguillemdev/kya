import { AuthData } from 'src/app/modelos/auth-model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { UpdateService } from '../servicios/update-service/update.service';
import { PagesId } from '../constantes/pages';
import { AuthService } from '../servicios/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private updateService: UpdateService,
    private router: Router,
    private authService: AuthService
  ) {

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      let authData: AuthData = await firstValueFrom(this.updateService.authData);
      let roles: string[] = this.authService.getRoles(authData.token);
      if(roles.filter(rol => rol === "ROLE_ADMIN").length > 0) {
        return Promise.resolve(true);
      } else {
        this.router.navigate([PagesId.DASHBOARD]);
        return Promise.resolve(false);
      }
  }

}
