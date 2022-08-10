import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathsService {

  constructor() { }

  isEven(number: number): boolean {
    return number % 2 == 0;
  }

  // Round and return given value
  round(value: number): number {
    return Math.round(value);
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 1000);
  }

}
