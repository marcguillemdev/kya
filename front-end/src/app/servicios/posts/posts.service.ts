import { Injectable } from '@angular/core';
import { Domain } from './../../modelos/domain';
import { endpoints } from 'src/app/constantes/endpoints';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { siteConstants } from 'src/app/constantes/site-constants';
import { Post } from 'src/app/modelos/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get(endpoints.kyaBackendUrl + endpoints.getAllPosts).pipe(
      map((response: Post[]) => response as Post[]),
      catchError(
        errorObjeto => {
          console.log(errorObjeto);
          return throwError(() => errorObjeto);
        }
      )
    )
  }

}
