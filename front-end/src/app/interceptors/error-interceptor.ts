import { DialogTypes } from 'src/app/constantes/dialogTypes';
import { DialogAsistService } from './../servicios/dialog-assist/dialog-asist.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialogAsistService: DialogAsistService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(!request.url.includes('login')) {
      return next.handle(request).pipe(
        catchError((requestError) => {
          if (requestError.status === 401 || requestError.status === 403) {
            this.dialogAsistService.abrirMensajeDialogoCustom("Error", "No tienes permiso para realizar esta acción", DialogTypes.ok, true);
          }
          return throwError(() => new Error(requestError));
        })
      );
    } else {
      return next.handle(request);
    }

  }
}
