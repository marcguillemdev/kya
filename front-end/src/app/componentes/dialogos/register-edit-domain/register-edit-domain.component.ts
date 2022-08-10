import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom, Subject } from 'rxjs';
import { DialogTypes } from 'src/app/constantes/dialogTypes';
import { Domain } from 'src/app/modelos/domain';
import { DialogAssistDeep1Service } from 'src/app/servicios/dialog-assist/dialog-assist-deep1.service';
import { DomainService } from 'src/app/servicios/domain/domain.service';

@Component({
  selector: 'app-register-edit-domain',
  templateUrl: './register-edit-domain.component.html',
  styleUrls: ['./register-edit-domain.component.css']
})
export class RegisterEditDomainComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  public domainReference: Domain;
  public originalDomain: Domain;
  public isUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private domainService: DomainService,
    private dialogAsistSubService: DialogAssistDeep1Service,
    private matRef: MatDialogRef<RegisterEditDomainComponent>
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.checkData();
  }

  checkData(): void {
    if(this.data.usuario) {
      this.domainReference = JSON.parse(JSON.stringify(this.data.usuario));
      this.originalDomain = JSON.parse(JSON.stringify(this.data.usuario));
      this.isUpdate = true;
    } else {
      this.domainReference = new Domain();
    }
  }

  log(user: Domain) {
    console.log(user);
    console.log(this.domainReference)
  }

  submitForm(form: NgForm): void {
    if(form.valid) {
      console.table(this.domainReference);
      if(!this.isUpdate) {
        this.domainService.registerDomain(this.domainReference).subscribe(
          async (response: void) => {
            await firstValueFrom(this.dialogAsistSubService.abrirMensajeDialogoCustom("Éxito", "Dominio registrado correctamente", DialogTypes.ok, true).afterClosed());
            this.matRef.close();
          }
        )
      } else {
        this.domainService.updateDomain(this.domainReference).subscribe(
          async (response: void) => {
            await firstValueFrom(this.dialogAsistSubService.abrirMensajeDialogoCustom("Éxito", "Dominio modificado correctamente", DialogTypes.ok, true).afterClosed());
            this.matRef.close();
          }
        )
      }
    }
  }

  selectionChange(event: any): void {

  }

}
