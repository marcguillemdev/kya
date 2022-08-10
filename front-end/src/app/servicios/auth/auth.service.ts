import { tap } from 'rxjs/operators';
import * as CryptoJS from "crypto-js";
import { Router } from '@angular/router';
import { endpoints } from 'src/app/constantes/endpoints';
import { catchError, firstValueFrom, interval, map, Observable, Subject, throwError, takeUntil, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/modelos/auth-model';
import { UpdateService } from '../update-service/update.service';
import { PagesId } from 'src/app/constantes/pages';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ngUnsubscribe = new Subject();
  private enabledTimer: boolean = false;

  constructor(
    private http: HttpClient,
    private updateService: UpdateService,
    private router: Router
  ) { }

  public async checkAuth(): Promise<boolean> {
    let authData: AuthData = this.getAuthFromLocalStorage();
    if(authData === null || authData === undefined) {
      this.updateService.emitAuthData(new AuthData());
      return Promise.resolve(true);
    } else {
      //console.log("Token encontrado, validando...");
      return this.checkStoredCreditentials(authData);
    }
  }

  public async checkStoredCreditentials(authData: AuthData): Promise<boolean> {
    let tokenIsValid: boolean = await firstValueFrom(this.validateToken(authData));
    //console.log("Token is valid from auth service: ", tokenIsValid);
    if(tokenIsValid) {
      // Token is valid, we proceed to refresh it
      let refreshToken: string = await this.refreshTokenAndValidate(authData);
      if(refreshToken !== null && refreshToken !== undefined) {
        //console.log("Token renovado, emitiendo auth data");
        this.saveInLocalStorage(new AuthData(refreshToken));
        this.updateService.emitAuthData(authData);
        this.startRefreshTokenTimer();
        return Promise.resolve(true);
      }
    }
    localStorage.removeItem("embed");
    return Promise.resolve(false);
  }

  private async refreshTokenAndValidate(authData: AuthData): Promise<string> {
    let refreshToken: AuthData = await firstValueFrom(this.refreshToken(authData));
    //console.log("Refreshed token: ", refreshToken);
    if(refreshToken !== null && refreshToken !== undefined) {
      return Promise.resolve(refreshToken.token);
    } else {
      return Promise.resolve(null);
    }
  }

  public login(nombreUsuario: string, password: string): Observable<AuthData> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.login,
      { "nombreUsuario": nombreUsuario, "password": password })
      .pipe(
        map((response: AuthData) => response as AuthData),
        catchError( (errorObjeto) => {
          return throwError(() => errorObjeto);
        }
      )
    );
  }

  public validateToken(authData: AuthData): Observable<boolean> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.validateToken, authData)
      .pipe(
        map((response: boolean) => response as boolean),
        catchError( errorObjeto => {
          return throwError(() => errorObjeto);
        }
      )
    );
  }

  public refreshToken(authData: AuthData): Observable<AuthData> {
    //console.error("Attemting to refresh token, old token: ", authData.token)
    return this.http.post(endpoints.kyaBackendUrl + endpoints.refreshToken, authData)
      .pipe(
        map((response: AuthData) => response as AuthData),
        catchError( errorObjeto => {
          //("Error al renovar token: ", errorObjeto);
          if(errorObjeto.status === 500) {
            //console.log("Returning null");
            return of<AuthData>(null);
          }
          return throwError(() => errorObjeto);
        }
      )
    );
  }

  public getUsername(token: string): string {
    return this.decodeJwt(token).sub;
  }

  public getRoles(token: string): string[] {
    //(this.decodeJwt(token));
    return this.decodeJwt(token).roles;
  }

  public decodeJwt(token: string): any {
    const payload: string = token.split('.')[1];
    const decodedPayload: string = atob(payload);
    const jsonPayload: any = JSON.parse(decodedPayload);
    return jsonPayload;
  }

  public saveInLocalStorage(authData: AuthData): void {
    localStorage.removeItem("embed");
    const encryptedAuthData: string = this.encrypt(JSON.stringify(authData));
    localStorage.setItem("embed", encryptedAuthData);
  }

  public getAuthFromLocalStorage(): AuthData {
    const encryptedAuthData: string = localStorage.getItem("embed");
    const decryptedAuthData: string = this.decrypt(encryptedAuthData);
    return JSON.parse(decryptedAuthData);
  }

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, "5^$grxwaBBmQ5uNYw2Wa689H4$t7p1").toString();
  }

  private decrypt(text: string): string {
    if(text === null || text === undefined) {
      return null;
    }
    return CryptoJS.AES.decrypt(text, "5^$grxwaBBmQ5uNYw2Wa689H4$t7p1").toString(CryptoJS.enc.Utf8);
  }

  private startRefreshTokenTimer(): void {
    if(!this.enabledTimer) {
      //console.log("RELOJ TOKEN ACTIVADO");
      this.enabledTimer = true;
      let segundosHastaExpirar: number = 300;
      if(segundosHastaExpirar) {
        const milisegundos = ((segundosHastaExpirar / 2) * 1000);
        //const milisegundos = 1000;
        interval(milisegundos).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(x => {
          this.checkStoredCreditentials(this.getAuthFromLocalStorage());
        });
      }
    }
  }

  public logout(): void {
    localStorage.removeItem("embed");
    this.router.navigate(["/login"]);
  }

}
