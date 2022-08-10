import { DialogAssistDeep1Service } from './../../../servicios/dialog-assist/dialog-assist-deep1.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { Rol } from 'src/app/modelos/rol';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DialogTypes } from 'src/app/constantes/dialogTypes';

@Component({
  selector: 'app-register-edit-user',
  templateUrl: './register-edit-user.component.html',
  styleUrls: ['./register-edit-user.component.css']
})
export class RegisterEditUserComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  public userReference: Usuario;
  public originalUser: Usuario;
  public selectedValues: string[] = [];
  public roles: Rol[];
  public isUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private dialogAsistSubService: DialogAssistDeep1Service,
    private matRef: MatDialogRef<RegisterEditUserComponent>
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.initializeData();
  }

  async initializeData(): Promise<void> {
    await firstValueFrom(this.usuarioService.getAllRoles()).then(
      (response: Rol[]) => {
        this.roles = response;
        this.checkData();
      }
    );
  }

  checkData(): void {
    if(this.data.usuario) {
      this.userReference = JSON.parse(JSON.stringify(this.data.usuario));
      this.originalUser = JSON.parse(JSON.stringify(this.data.usuario));
      this.selectedValues = [];
      for(let role of this.userReference.roles) {
        this.selectedValues.push(role.id);
      }
      this.isUpdate = true;
      console.log(this.selectedValues)
    } else {
      this.userReference = new Usuario();
    }
  }

  log(user: Usuario) {
    console.log(user);
    console.log(this.userReference)
  }

  submitForm(form: NgForm): void {
    if(form.valid) {
      this.setRolesInUserObject();
      console.table(this.userReference);
      if(!this.isUpdate) {
        this.usuarioService.registerUser(this.userReference).subscribe(
          async (response: void) => {
            await firstValueFrom(this.dialogAsistSubService.abrirMensajeDialogoCustom("Éxito", "Usuario registrado correctamente", DialogTypes.ok, true).afterClosed());
            this.matRef.close();
          }
        )
      } else {
        this.usuarioService.updateUser(this.originalUser, this.userReference).subscribe(
          async (response: void) => {
            await firstValueFrom(this.dialogAsistSubService.abrirMensajeDialogoCustom("Éxito", "Usuario modificado correctamente", DialogTypes.ok, true).afterClosed());
            this.matRef.close();
          }
        )
      }
    }
  }

  setRolesInUserObject(): void {
    this.userReference.roles = [];
    for(let rolId of this.selectedValues) {
      this.userReference.roles.push(this.roles.find(rol => rol.id == +rolId).rolNombre);
    }
  }

  selectionChange(event: any): void {

  }
}
