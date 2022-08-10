import { Rol } from './../../modelos/rol';
import { Usuario } from './../../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UpdateService } from '../update-service/update.service';
import { endpoints } from 'src/app/constantes/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllUsers(): Observable<Usuario[]> {
    return this.http.get(endpoints.kyaBackendUrl + endpoints.getUsuarios)
      .pipe(
        map((response: Usuario[]) => response as Usuario[]),
        catchError( (errorObjeto) => {
          return throwError(() => errorObjeto);
        }
      )
    );
  }

  public getAllRoles(): Observable<Rol[]> {
    return this.http.get(endpoints.kyaBackendUrl + endpoints.getRoles)
      .pipe(
        map((response: Rol[]) => response as Rol[]),
        catchError( (errorObjeto) => {
          return throwError(() => errorObjeto);
        }
      )
    );
  }

  public registerUser(usuario: Usuario): Observable<void> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.registerUser, usuario)
      .pipe(
        map((response: any) => response as any),
        catchError( (errorObjeto) => {
          return throwError(() => errorObjeto);
        }
      )
    );
  }

  public updateUser(usuarioOriginal: Usuario, usuarioModificado: Usuario): Observable<void> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.updateUser, {usuarioOriginal: usuarioOriginal, usuarioModificado: usuarioModificado})
      .pipe(
        map((response: any) => response as any),
        catchError( (errorObjeto) => {
          return throwError(() => errorObjeto);
        }
      )
    );
  }

  public deleteUser(usuario: Usuario): Observable<void> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.deleteUser, usuario)
      .pipe(
        map((response: any) => response as any),
        catchError( (errorObjeto) => {
          return throwError(() => errorObjeto);
        }
      )
    );
  }

}
