import { Domain } from './../../modelos/domain';
import { endpoints } from 'src/app/constantes/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { siteConstants } from 'src/app/constantes/site-constants';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(
    private http: HttpClient
  ) { }

  public getDomains(): Observable<Domain[]> {
    return this.http.get(endpoints.kyaBackendUrl + endpoints.getDomains).pipe(
      map((response: Domain[]) => response as Domain[]),
      catchError(
        errorObjeto => {
          console.log(errorObjeto);
          return throwError(() => errorObjeto);
        }
      )
    )
  }

  public getAllDomains(): Observable<Domain[]> {
    return this.http.get(endpoints.kyaBackendUrl + endpoints.getAllDomains).pipe(
      map((response: Domain[]) => response as Domain[]),
      catchError(
        errorObjeto => {
          console.log(errorObjeto);
          return throwError(() => errorObjeto);
        }
      )
    )
  }

  public registerDomain(domain: Domain): Observable<void> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.registerDomain, domain).pipe(
      map((response: any) => response as any),
      catchError(
        errorObjeto => {
          console.log(errorObjeto);
          return throwError(() => errorObjeto);
        }
      )
    )
  }

  public updateDomain(domain: Domain): Observable<void> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.updateDomain, domain).pipe(
      map((response: any) => response as any),
      catchError(
        errorObjeto => {
          console.log(errorObjeto);
          return throwError(() => errorObjeto);
        }
      )
    )
  }

  public deleteDomain(domain: Domain): Observable<void> {
    return this.http.post(endpoints.kyaBackendUrl + endpoints.deleteDomain, domain).pipe(
      map((response: any) => response as any),
      catchError(
        errorObjeto => {
          console.log(errorObjeto);
          return throwError(() => errorObjeto);
        }
      )
    )
  }

}
