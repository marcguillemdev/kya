import { DialogAsistService } from 'src/app/servicios/dialog-assist/dialog-asist.service';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { UpdateService } from 'src/app/servicios/update-service/update.service';
import { DialogTypes } from 'src/app/constantes/dialogTypes';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  public usuarioSeleccionado: Usuario;
  public usuarios: Usuario[];
  public selectedProduct1: any;
  public currentViewport: string;

  constructor(
    private usuarioService: UsuarioService,
    private dialogAsistService: DialogAsistService,
    private updateService: UpdateService
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getUsuarios();

    console.table(this.usuarios);
  }

  async getUsuarios(): Promise<void> {
    this.usuarios = await firstValueFrom(this.usuarioService.getAllUsers());
  }

  refresh(): void {
    this.getUsuarios();
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

  async addUser(): Promise<void> {
    await firstValueFrom(this.dialogAsistService.abrirCreacionDeUsuario().afterClosed());
    this.getUsuarios();
  }

  async editUser(): Promise<void> {
    await firstValueFrom(this.dialogAsistService.abrirEdicionDeUsuario(this.usuarioSeleccionado).afterClosed());
    this.getUsuarios();
  }

  onRowSelect(event) {
    this.usuarioSeleccionado = event.data;
  }

  onRowUnselect(event) {
    this.usuarioSeleccionado = null;
  }

  async deleteUser(): Promise<void> {
    let respuesta: boolean = await firstValueFrom(this.dialogAsistService.abrirMensajeDialogoCustom("Eliminar usuario", "¿Deseas eliminar el usuario <strong>" + this.usuarioSeleccionado.nombreUsuario + "</strong>? <br> Se desvinculará de todos los dominios y posts.", DialogTypes.yesNo).afterClosed());
    if(respuesta) {
      await firstValueFrom(this.usuarioService.deleteUser(this.usuarioSeleccionado));
      this.getUsuarios();
    }

  }

}
