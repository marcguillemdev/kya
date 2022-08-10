import { DialogTypes } from 'src/app/constantes/dialogTypes';
import { rutas } from './constantes/rutas';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil, lastValueFrom } from 'rxjs';
import { PagesId } from 'src/app/constantes/pages';
import { siteConstants } from 'src/app/constantes/site-constants';
import { fadeIn } from './animaciones/fade-in';
import { CssService } from './servicios/css/css.service';
import { UpdateService } from './servicios/update-service/update.service';
import { AuthService } from './servicios/auth/auth.service';
import { DialogAsistService } from './servicios/dialog-assist/dialog-asist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeIn
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('navbarPegado') navbarPegado: ElementRef;

  private ngUnsubscribe = new Subject();
  private previousRoute: string;

  public siteConstants = siteConstants;
  heightDinamico: string = "0px";
  mostrarNavbar: boolean = true;
  mostrarBreadcumb: boolean = false;
  public Pages = PagesId;
  public currentViewport: string;

  constructor(
    private updateService: UpdateService,
    private mediaObserver: MediaObserver,
    private router: Router,
    private cssService: CssService,
    private authService: AuthService,
    private dialogAsistService: DialogAsistService
  ) {

  }

  @HostListener('window:beforeunload')
  canDeactivate(): void {
    localStorage.removeItem("firstTimeNavigationDone");
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  async ngOnInit(): Promise<void> {
    this.doCheckAuth();
    this.enableViewportEmitter();
    this.listenForRouteChanges();
    this.listenViewport();
    this.cssService.setCustomStyles();
  }

  private async doCheckAuth(): Promise<void> {
    let firedMethod: boolean = await lastValueFrom(this.updateService.checkAuthMethodFired);
    console.log("Check auth method fired:", firedMethod);
    if(!firedMethod) {
      await this.authService.checkAuth();
    }
  }

  listenViewport(): void {
    this.updateService.currentViewport.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      respuesta => {
        this.currentViewport = respuesta;
      }
    )
  }

  enableViewportEmitter(): void {
    this.mediaObserver.asObservable().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      respuesta => {
        this.updateService.emitCurrentViewport(respuesta[0].mqAlias);
        //console.log("Current viewport:", respuesta[0].mqAlias)
      }
    )
  }

  onResized($event: any): void {
    this.setearAlturaDinamica($event.newRect.height);
    this.updateService.emitCurrentHeaderHeight($event.newRect.height);

  }

  setearAlturaDinamica(height?: string) {
    if(height) {
      this.heightDinamico = height + "px";
    } else {
      this.heightDinamico = this.navbarPegado.nativeElement.offsetHeight + "px";
    }
  }

  listenForRouteChanges(): void {
    this.router.events.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      evento => {
        // Console log when navigation start
        if(evento instanceof NavigationEnd) {
          //console.log("Previuous route", this.previousRoute);
          //console.log("Actual route:", this.previousRoute);
          this.afterRouteChanges(evento);
        }
      }
    );
  }

  afterRouteChanges(evento: NavigationEnd): void {
    this.selectNavbarButton(evento);
    this.emitUrlChangeEventToServicesPage(evento);
    this.scrollIfNeeded(evento);
  }

  scrollIfNeeded(evento: NavigationEnd): void {
    //console.log(this.previousRoute, evento.urlAfterRedirects)
    if(this.previousRoute !== evento.urlAfterRedirects.split("?")[0]) {
      window.scroll(0, 0);
    }
    this.previousRoute = evento.urlAfterRedirects.split("?")[0];
  }

  emitUrlChangeEventToServicesPage(event: NavigationEnd): void {
    console.log("Emitting url change event", event.urlAfterRedirects);
    this.updateService.emitUrlChangeEvent(event);
  }

  routeIsPresentInRoutesArray(route: string): boolean {
    return rutas.filter(ruta => ruta.path.includes(route)).length > 0;
  }

  selectNavbarButton(navigationEnd: NavigationEnd): void {
    const pagina: string = <string> navigationEnd.urlAfterRedirects.replace("/", "");
    this.updateService.emitNavbarSelectedButton(pagina);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const numb = window.scrollY;
    this.updateService.emitCurrentScrollValue(numb);
  }


}
