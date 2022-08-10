import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  openSidenav(sidenav: MatSidenav): void {
    sidenav.open();
  }

  closeSidenav(sidenav: MatSidenav): void {
    sidenav.close();
  }

  toggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle();
  }

  loadDynamicComponentIntoSidenav(componentToLoad: Type<any>, containerToPlaceComponent: ViewContainerRef, matSideNav?: MatSidenav, openSideNavAfterLoad?: boolean): ComponentRef<any> {
    //console.log("Container: ", containerToPlaceComponent);
    containerToPlaceComponent.clear();
    const componentRef = containerToPlaceComponent.createComponent(componentToLoad);
    componentRef.changeDetectorRef.detectChanges();
    if(openSideNavAfterLoad && matSideNav) {
      this.openSidenav(matSideNav);
    }
    return componentRef;
  }

}
