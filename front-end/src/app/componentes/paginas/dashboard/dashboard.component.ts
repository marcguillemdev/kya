import { AuthData } from 'src/app/modelos/auth-model';
import { UpdateService } from 'src/app/servicios/update-service/update.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PagesId } from 'src/app/constantes/pages';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { DomainService } from 'src/app/servicios/domain/domain.service';
import { Domain } from 'src/app/modelos/domain';
import { DialogAsistService } from 'src/app/servicios/dialog-assist/dialog-asist.service';
import { DialogTypes } from 'src/app/constantes/dialogTypes';
import { WaitService } from 'src/app/servicios/wait/wait.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  public selectedButton: string;
  public PagesId = PagesId;
  public authData: AuthData;
  public domains: Domain[];
  public selectedValueDomain: number;
  public isAdmin: boolean;
  public sidebarWidth: string = "304px";
  public collapsedSidebar: boolean = false;
  public username: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private updateService: UpdateService,
    private domainService: DomainService,
    private dialogAsistService: DialogAsistService,
    private waitService: WaitService
  ) { }

  ngOnInit(): void {
    this.listenForRouterChanges();
    this.getAuthData();
    this.listenSidebarState();
  }

  async getAuthData(): Promise<void> {
    this.authData = await firstValueFrom(this.updateService.authData);
    this.afterAuthData();
  }

  private async afterAuthData(): Promise<void> {
    this.isAdmin = this.authService.getRoles(this.authData.token).filter(role => role === "ROLE_ADMIN").length > 0;
    this.username = this.authService.getUsername(this.authData.token);
    console.log(this.isAdmin)
    this.afterDomainLoaded(await firstValueFrom(this.domainService.getDomains()));
  }

  afterDomainLoaded(domains: Domain[]): void {
    if(domains && domains.length > 0) {
      this.selectedValueDomain = domains[0].id;
      this.setWebsite(this.selectedValueDomain.toString());
      this.updateService.currentWorkingDomain.next(this.selectedValueDomain);
    }
    this.domains = domains;

  }

  listenForRouterChanges(): void {
    this.updateService.urlChangeEvent.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      evento => {
        this.afterRouteChanges(evento);
      }
    );
  }

  private afterRouteChanges(evento: NavigationEnd): void {
    this.setSelectedButton(evento.url);
  }

  private setSelectedButton(url: string): void {
    this.selectedButton = url;
    console.log(this.selectedButton);
  }

  logout(): void {
    this.dialogAsistService.abrirMensajeDialogoCustom("Se va a cerrar la sesión...", "¿Deseas cerrar la sesión?", DialogTypes.yesNo, true).afterClosed().subscribe(
      respuesta => {
        if(respuesta) {
          localStorage.removeItem("embed");
          this.router.navigate([PagesId.LOGIN]);
        }
      }
    );
  }

  setWebsite(value: string): void {
    console.log(value);
    localStorage.setItem("website", value);
  }

  listenSidebarState(): void {
    // cast string to boolean
    this.collapsedSidebar = localStorage.getItem("sidebar") === "true";
    this.toggleAndProccessSidebar(false);
    console.log("Estado de la barra lateral: " + this.collapsedSidebar);
    this.updateService.sidebarState.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      async evento => {
        if(evento) {
          this.sidebarWidth = "78px";
          await this.waitService.wait(1);
          this.collapsedSidebar = true;
        } else {
          this.sidebarWidth = "304px";
          this.collapsedSidebar = false;
        }
      }
    );
  }

  public async toggleAndProccessSidebar(toggle: boolean): Promise<void> {
    if(toggle) {
      this.collapsedSidebar = !this.collapsedSidebar;
    }
    localStorage.setItem("sidebar", this.collapsedSidebar.toString());
    this.updateService.sidebarState.next(this.collapsedSidebar);
  }

  public async openDomainDialog(): Promise<void> {
   await firstValueFrom(this.dialogAsistService.abrirDialogoDominios().afterClosed());
   this.selectedValueDomain = +localStorage.getItem("website");
  }

  async updateDomains(): Promise<void> {
    this.afterDomainLoaded(await firstValueFrom(this.domainService.getDomains()));
  }

}
