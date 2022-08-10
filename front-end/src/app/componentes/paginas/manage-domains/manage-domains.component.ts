import { DialogTypes } from 'src/app/constantes/dialogTypes';
import { Domain } from 'src/app/modelos/domain';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { DialogAsistService } from 'src/app/servicios/dialog-assist/dialog-asist.service';
import { DomainService } from 'src/app/servicios/domain/domain.service';
import { UpdateService } from 'src/app/servicios/update-service/update.service';

@Component({
  selector: 'app-manage-domains',
  templateUrl: './manage-domains.component.html',
  styleUrls: ['./manage-domains.component.css']
})
export class ManageDomainsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  public dominioSeleccionado: Domain;
  public domains: Domain[];
  public selectedProduct1: any;
  public currentViewport: string;

  constructor(
    private domainService: DomainService,
    private dialogAsistService: DialogAsistService,
    private updateService: UpdateService
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getDomains();

    console.table(this.domains);
  }

  async getDomains(): Promise<void> {
    this.domains = await firstValueFrom(this.domainService.getAllDomains());
  }

  refresh(): void {
    this.getDomains();
  }

  async deleteDomain(): Promise<void> {
    let respuesta: boolean = await firstValueFrom(
      this.dialogAsistService.abrirMensajeDialogoCustom("Eliminar dominio", "¿Deseas eliminar el dominio " + this.dominioSeleccionado.domainName + "? <br> Se desvincularán todos los usuarios y posts.", DialogTypes.yesNo).afterClosed());
    if (respuesta) {
      await firstValueFrom(this.domainService.deleteDomain(this.dominioSeleccionado));
      this.getDomains();
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

  async addDomain(): Promise<void> {
   await firstValueFrom(this.dialogAsistService.abrirCrudDominio().afterClosed());
   this.getDomains();
  }

  async editDomain(): Promise<void> {
    await firstValueFrom(this.dialogAsistService.abrirCrudDominio(this.dominioSeleccionado).afterClosed());
    this.getDomains();
  }

  onRowSelect(event) {
    this.dominioSeleccionado = event.data;
  }

  onRowUnselect(event) {
    this.dominioSeleccionado = null;
  }

}
