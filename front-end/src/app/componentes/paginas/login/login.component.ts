import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateService } from 'src/app/servicios/update-service/update.service';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { PagesId } from 'src/app/constantes/pages';
import { Router } from '@angular/router';
import { DialogAsistService } from 'src/app/servicios/dialog-assist/dialog-asist.service';
import { DialogTypes } from 'src/app/constantes/dialogTypes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  public currentViewport: string;
  public formulario: FormGroup;
  public tokenChecked: boolean = false;

  constructor(
    private updateService: UpdateService,
    private authService: AuthService,
    private router: Router,
    private dialogAsistService: DialogAsistService
  ) {
    this.formulario = new FormGroup({
      nombreUsuario: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    });
   }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  async ngOnInit(): Promise<void> {
    this.listenViewport();
    let tokenIsValid: boolean = await this.authService.checkAuth();
    if(tokenIsValid) {
      console.log(this.router.url)
      this.router.navigate([PagesId.DASHBOARD]);
      console.log("Navigating to dashboard");
      this.tokenChecked = true;
    } else {
      this.tokenChecked = true;
    }
  }

  listenViewport(): void {
    this.updateService.currentViewport.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      respuesta => {
        this.currentViewport = respuesta;
      }
    );
  }

  login(): void {
    console.log(this.formulario);
    if(!this.formulario.status.toString().includes("INVALID")) {
      this.authService.login(this.formulario.value.nombreUsuario, this.formulario.value.password)
      .subscribe({
        next: respuesta => {
          this.handleResponse(respuesta);
        },
        error: error => {
          this.handleError(error);
        }
      });
    }
  }

  private handleResponse(respuesta: any): void {
    if(respuesta) {
      this.authService.saveInLocalStorage(respuesta);
      this.updateService.emitAuthData(respuesta);
      this.router.navigate([PagesId.DASHBOARD]);
      console.log("Navigating to dashboard");
    }
  }

  private handleError(error: any) {
    console.log(error);
    if(error.status === 401) {
      this.dialogAsistService.abrirMensajeDialogoCustom("¡Ups! Ha ocurrido un error...", "Usuario o contraseña incorrectos", DialogTypes.ok, true);
    } else {
      console.log("error", error);
      this.dialogAsistService.abrirMensajeDialogoCustom("¡Ups! Ha ocurrido un error...", error.error.description, DialogTypes.ok, true);
    }
  }

}
