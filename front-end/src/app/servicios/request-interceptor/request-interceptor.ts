import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { endpoints } from "src/app/constantes/endpoints";
import { AuthService } from "../auth/auth.service";
import { UpdateService } from "../update-service/update.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private listaURlsExcluidasDelToken: string[] = [];

  constructor(
    private authService: AuthService
  ) {
    this.listaURlsExcluidasDelToken.push(endpoints.kyaBackendUrl + endpoints.login);
    this.listaURlsExcluidasDelToken.push(endpoints.kyaBackendUrl + endpoints.validateToken);
    console.log(this.listaURlsExcluidasDelToken)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.listaURlsExcluidasDelToken.indexOf(req.url) === -1) {
      const userToken = this.authService.getAuthFromLocalStorage();
      //console.log("Attempting to add token to request: ", userToken);
      if(userToken !== null && userToken !== undefined) { {
        if(userToken.token !== undefined && userToken.token !== null) {
          const modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userToken.token}`),
          });
          return next.handle(modifiedReq);
        }
      }
    }
  }

    return next.handle(req);
  }
}
