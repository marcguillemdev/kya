import { Component, ComponentRef, Inject, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CssCorporativo } from 'src/app/constantes/css/colores-corporativos';
import { MatDialogCustomIds } from 'src/app/constantes/ids-mat-dialogs';
import { CssService } from 'src/app/servicios/css/css.service';
import { UpdateService } from 'src/app/servicios/update-service/update.service';

@Component({
  selector: 'app-dialog-assist',
  templateUrl: './dialog-assist.component.html',
  styleUrls: ['./dialog-assist.component.css']
})
export class DialogAssistComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  public coloresCorporativos = CssCorporativo;
  public mouseOverCloseButton: boolean = false;

  movible: boolean = true;
  scrollable: boolean = false;
  dialogHeader: boolean = true;
  dynamicTitle: string;
  staticTitle: string;
  headerBackgroundColor: string;
  headerTextColor: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private updateService: UpdateService,
    private matDialogRef: MatDialogRef<DialogAssistComponent>,
    private cssService: CssService
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.setData();
    this.configureDialogBehaviour();
    this.setHeaderColor();
    this.loadComponent();
  }

  private setData(): void {
    console.info(this.data)
    this.staticTitle = this.data.title;
    this.scrollable = this.data.scrollable;
  }

  configureDialogBehaviour(): void {
    if(this.data.movible != undefined) {
      this.movible = this.data.movible;
    }
    if(this.data.dialogHeader !== null && this.data.dialogHeader !== undefined) {
      this.dialogHeader = this.data.dialogHeader;
    }
  }

  setHeaderColor(): void {
    if(this.data.headerBackgroundColor && this.data.headerTextColor) {
      this.headerBackgroundColor = this.data.headerBackgroundColor;
      this.headerTextColor = this.data.headerTextColor;
    } else {
      this.headerBackgroundColor = this.cssService.editColor(this.coloresCorporativos.PRIMARY, 0);
      this.headerTextColor = "white";
    }
  }

  loadComponent() {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(this.data.componente);
    this.establecerVariables(this.data.componente, componentRef);
    componentRef.changeDetectorRef.detectChanges();
  }

  establecerVariables(componente: Type<any>, referencia: ComponentRef<unknown>): void {
    switch(componente) {
      default: {
        //console.log("Nothing to inject")
      }
    }
  }

  closeDialog(): void {
    if(this.data.closeButtonReturnData) {
      this.matDialogRef.close(this.data.closeButtonReturnData);
    } else {
      this.matDialogRef.close();
    }
  }
}
