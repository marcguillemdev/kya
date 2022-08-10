import { RegisterEditDomainComponent } from './../../componentes/dialogos/register-edit-domain/register-edit-domain.component';
import { Domain } from 'src/app/modelos/domain';
import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomainSelectorComponent } from 'src/app/componentes/dialogos/domain-selector/domain-selector.component';
import { RegisterEditUserComponent } from 'src/app/componentes/dialogos/register-edit-user/register-edit-user.component';
import { DialogAssistComponent } from 'src/app/componentes/utils/dialog-assist/dialog-assist.component';
import { DialogCustomComponent } from 'src/app/componentes/utils/dialog-custom/dialog-custom.component';
import { MatDialogCustomIds } from 'src/app/constantes/ids-mat-dialogs';
import { Usuario } from 'src/app/modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class DialogAsistService {

  private readonly singleInstanceOfTheSameDialog: boolean = true;
  //private language: Language;

  constructor(
    public dialogoDinamico: MatDialog
  ) {
    //this.initializeLanguage();
  }

  /*private async initializeLanguage(): Promise<void> {
    await this.updateService.currentLanguage.pipe(tap(lang => this.language = lang)).subscribe();
  }*/

  /**
   * Return true if the dialog is opened.
  */
  isDialogOpened(customId: number): boolean {
    let openedDialogs: MatDialogRef<any>[] = this.getOpenedDialogs();
    return openedDialogs.filter(dialogo => dialogo.componentInstance.data.customId === customId)[0] !== undefined;
  }

  getRealIdFromDialog(customId: number): number {
    let openedDialogs: MatDialogRef<any>[] = this.getOpenedDialogs();
    return openedDialogs.filter(dialogo => dialogo.componentInstance.data.customId === customId)[0].componentInstance.id;
  }

  closeDialogById(customId: number): void {
    let openedDialogs: MatDialogRef<any>[] = this.getOpenedDialogs();
    let matchedDialog: MatDialogRef<any> = openedDialogs.filter(dialogo => dialogo.componentInstance.data.customId === customId)[0];
    if(matchedDialog) {
      matchedDialog.close();
    }
  }

  getOpenedDialogs(): MatDialogRef<any>[] {
    return this.dialogoDinamico.openDialogs;
  }

  abrirMensajeDialogoCustom(title: string, description: string, dialogType: number, movible?: boolean, inputLabelText?: string): MatDialogRef<DialogAssistComponent> {
    let data = {
      title: title,
      descripcion: description,
      dialogType: dialogType,
      componente: DialogCustomComponent,
      movible: movible,
      inputLabelText: inputLabelText,
      customId: MatDialogCustomIds.matDialogMensajeCustom
    }
    return this.openDialog(DialogAssistComponent, 2, data);
  }

  abrirCreacionDeUsuario(): MatDialogRef<DialogAssistComponent> {
    let data = {
      title: "Añadir usuario",
      componente: RegisterEditUserComponent,
      movible: true,
      closeButton: true,
      customId: MatDialogCustomIds.matDialogCreateUser
    }
    return this.openDialog(DialogAssistComponent, 2, data);
  }

  abrirEdicionDeUsuario(usuarioParaEditar: Usuario): MatDialogRef<DialogAssistComponent> {
    let data = {
      title: "Modificar usuario",
      componente: RegisterEditUserComponent,
      usuario: usuarioParaEditar,
      movible: true,
      closeButton: true,
      customId: MatDialogCustomIds.matDialogCreateUser
    }
    return this.openDialog(DialogAssistComponent, 2, data);
  }

  abrirCrudDominio(dominioParaEditar?: Domain): MatDialogRef<DialogAssistComponent> {
    let title: string = "Añadir dominio";
    if(dominioParaEditar) {
      title = "Modificar dominio";
    }
    let data = {
      title: title,
      componente: RegisterEditDomainComponent,
      usuario: dominioParaEditar? dominioParaEditar : null,
      movible: true,
      closeButton: true,
      customId: MatDialogCustomIds.matDialogCreateUser
    }
    return this.openDialog(DialogAssistComponent, 2, data);
  }

  abrirDialogoDominios(): MatDialogRef<DialogAssistComponent> {
    let data = {
      title: "Dominios",
      componente: DomainSelectorComponent,
      movible: true,
      closeButton: true,
      customId: MatDialogCustomIds.matDialogCreateUser
    }
    return this.openDialog(DialogAssistComponent, 2, data);
  }

  private openDialog(componente: Type<any>, tamanio: number, data: any): MatDialogRef<any> {
    //TODO: Type data
    let dialogRef;
    let isDialogAlreadyOpen: boolean;
    if(this.singleInstanceOfTheSameDialog) {
      isDialogAlreadyOpen = this.isDialogOpened(data.customId);
      if(isDialogAlreadyOpen) {
        return null;
      } else {
        switch(tamanio) {
          case 1: {
            let opciones: any = {
              width: "1000px",
              height: "800px",
              disableClose: true,
              data: data,
              backdropClass: "bdrop"
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 2: {
            let opciones: any = {
              disableClose: true,
              data: data,
              backdropClass: "bdrop"
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 3: {
            let opciones: any = {
              width: "100%",
              height: "100%",
              disableClose: true,
              data: data,
              backdropClass: "bdrop"
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 4: {
            let opciones: any = {
              width: "50%",
              height: "80%",
              disableClose: true,
              data: data,
              backdropClass: "bdrop"
            }

            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 5: {
            let opciones: any = {
              disableClose: true,
              data: data,
              maxWidth: "700px",
              backdropClass: "bdrop"
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 6: {
            let opciones: any = {
              disableClose: true,
              data: data,
              width: "1100px",
              height: "650px",
              backdropClass: "bdrop",
              panelClass: ['custom-dialog-container']
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 7: {
            let opciones: any = {
              disableClose: true,
              data: data,
              maxWidth: "550px",
              backdropClass: "bdrop",
              panelClass: ['custom-dialog-container']
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 8: {
            let opciones: any = {
              disableClose: true,
              data: data,
              width: "700px",
              minWidth: "0px",
              backdropClass: "bdrop",
              panelClass: ['custom-dialog-container']
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
          case 9: {
            let opciones: any = {
              disableClose: false,
              data: data,
              width: "300px",
              minWidth: "0px",
              backdropClass: "bdrop",
              panelClass: ['custom-dialog-container']
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }

          default: {
            let opciones: any = {
              disableClose: true,
              backdropClass: "bdrop"
            }
            dialogRef = this.dialogoDinamico.open(componente, opciones);
            break;
          }
        }
        return dialogRef;
      }
    }
    return null;
  }
}
