import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilsService {

  constructor() { }


  normalizeString(cadena: string): string {
    return cadena.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }

  replaceAllWhiteSpaces(source: string, replaceWith: string): string {
    return source.replace(/ /g, replaceWith).toLocaleLowerCase();
  }

  replaceAllSemicolonWithSpaces(source: string, replaceWith): string {
    let retorno: string = source.replace(/-/g, replaceWith);
    return retorno[0].toUpperCase() + retorno.substring(1);
  }

  // Do a method that replace all occurrences of a string in a string
  replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  // Do a mehtod that capitalize the first letter of a string
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //Do a method that capitalize every first letter of every word
  capitalizeEveryFirstLetter(str: string): string {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  // Do a method that remove all characters between two characters
  removeCharactersBetween(str: string, start: string, end: string): string {
    return str.split(start).join('').split(end).join('');
  }

}
