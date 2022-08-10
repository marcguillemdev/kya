import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaitService {

  constructor() { }

  wait(seconds: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, seconds) );
  }

}
