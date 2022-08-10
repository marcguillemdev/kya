import { NavigationEnd } from '@angular/router';
import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { PagesId } from 'src/app/constantes/pages';
import { StringUtilsService } from "../string-utils/string-utils.service";
import { AuthData } from 'src/app/modelos/auth-model';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  public authData: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(null);
  public currentViewport: ReplaySubject<string> = new ReplaySubject<string>(1);
  public selectedNavbarButton: BehaviorSubject<string> = new BehaviorSubject<string>(PagesId.LOGIN);
  public currentHeaderHeight: ReplaySubject<number> = new ReplaySubject<number>(1);
  public currentScrollValue: ReplaySubject<number> = new ReplaySubject<number>(1);
  public previousRoute: BehaviorSubject<string> = new BehaviorSubject<string>("none");
  public urlChangeEvent: BehaviorSubject<NavigationEnd> = new BehaviorSubject<NavigationEnd>(null);
  public checkAuthMethodFired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentWorkingDomain: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public sidebarState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private stringUtils: StringUtilsService
  ) {

  }

  public emitCheckAuthMethodFired(value: boolean) {
    this.checkAuthMethodFired.next(value);
  }

  public emitAuthData(authData: AuthData): void {
    this.authData.next(authData);
  }

  public emitUrlChangeEvent(evento: NavigationEnd): void {
    this.urlChangeEvent.next(evento);
  }

  public emitPreviousRoute(route: string): void {
    this.previousRoute.next(route);
  }

  public emitCurrentScrollValue(scrollValue: number): void {
    this.currentScrollValue.next(scrollValue);
  }

  public emitCurrentHeaderHeight(height: number): void {
    this.currentHeaderHeight.next(height);
  }

  public emitNavbarSelectedButton(navbarButton: string): void {
    this.selectedNavbarButton.next(navbarButton);
  }

  public emitCurrentViewport(viewport: string) {
    this.currentViewport.next(viewport);
  }

}
