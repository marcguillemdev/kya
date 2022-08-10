import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTypes } from 'src/app/constantes/dialogTypes';

@Component({
  selector: 'app-dialog-custom',
  templateUrl: './dialog-custom.component.html',
  styleUrls: ['./dialog-custom.component.css']
})
export class DialogCustomComponent implements OnInit {

  dialogType: number;

  descripcion: string;
  okButton: boolean = false;
  refreshButton: boolean = false;
  yesNoButton: boolean = false;
  inputText: boolean = false;
  inputLabelText: string = "Escriba aquí";
  inputValue: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private matRefDialog: MatDialogRef<DialogCustomComponent>
  ) { }

  ngOnInit(): void {
    //console.log(this.datos)
    switch(this.datos.dialogType) {
      case DialogTypes.yesNo: {
        this.yesNoButton = true;
        break;
      }
      case DialogTypes.ok: {
        this.okButton = true;
        break;
      }
      case DialogTypes.refresh: {
        this.refreshButton = true;
        break;
      }
      case DialogTypes.inputText: {
        this.inputText = true;
        this.inputLabelText = this.datos.inputLabelText;
      }
    }
  }

  actualizar(): void {
    document.location.reload();
  }

  closeDialog(value: any) {
    this.matRefDialog.close(value);
  }

}
