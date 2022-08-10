import { PagesId } from 'src/app/constantes/pages';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UpdateService } from '../servicios/update-service/update.service';
import { SeoService } from '../servicios/seo/seo.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationGuard implements CanActivate {

  constructor(
    private updateService: UpdateService,
    private seoService: SeoService
  ) {

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      let routerWrapper: HTMLElement = document.getElementsByClassName("routerOutletWrapper")[0] as HTMLElement;
      if(routerWrapper) {
        //let animacionEntrada: string = "animate__fadeInLeftBig";
        //let animacionSalida: string = "animate__fadeOutRightBig";
        this.deleteAllClassesWithPrefix(routerWrapper, "animate__");
        routerWrapper.style.animationDuration = ".6s";

        let previousUrl: string = await firstValueFrom(this.updateService.previousRoute);
        let actualUrl: string = state.url.replace("/", "");

        previousUrl = previousUrl.replace("/", "");

        //console.log("Received previous url", previousUrl);

        let animacionEntrada: string = "animate__fadeIn";
        let animacionSalida: string = "animate__fadeOut";


        if(!this.checkIfClassIsPresent(routerWrapper, "animate__animated")){
          routerWrapper.classList.add("animate__animated");
        }

        this.deleteClass(routerWrapper, animacionEntrada);

        if(localStorage.getItem("firstTimeNavigationDone")) {
          routerWrapper.classList.add(animacionSalida);
          await this.delay(300);
          this.deleteClass(routerWrapper, animacionSalida);
          //console.log("Animacion de salida: ", animacionSalida);
        } else {
          localStorage.setItem("firstTimeNavigationDone", "true");
        }
        // add class to routerWrapper
        routerWrapper.classList.add(animacionEntrada);
        //console.log("Animacion de entrada: ", animacionEntrada);
        this.updateService.emitPreviousRoute(state.url);
      }

      return true;
  }

  //delete all css classes if they are starting with the given prefix
  deleteAllClassesWithPrefix(element: HTMLElement, prefix: string): void {
    if(element) {
      let classes: string[] = element.className.split(' ');
      for(let i = 0; i < classes.length; i++) {
        if(classes[i].startsWith(prefix)) {
          element.classList.remove(classes[i]);
        }
      }
    }

  }

  // delete css given css class from element
  deleteClass(element: HTMLElement, className: string): void {
    element.classList.remove(className);
  }

  // Set localStorage variable called firstTimeNavigation to given value
  setFirstTimeNavigation(value: boolean): void {
    localStorage.setItem("firstTimeNavigation", value.toString());
  }

  // check if given css class is present in given element
  checkIfClassIsPresent(element: HTMLElement, className: string): boolean {
    return element.classList.contains(className);
  }

  delay(ms: number): Promise<void> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
