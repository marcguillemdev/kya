import { AutofocusDirective } from './directivas/autofocus';
import { AnimationGuard } from './guardianes/animation.guard';
import { siteConstants } from './constantes/site-constants';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

//ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

// THIRD PARTY
import { NgParticlesModule } from 'ng-particles';
import {TableModule} from 'primeng/table';

// COMPONENTS AND AUTO UPDATED MODULES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { rutas } from './constantes/rutas';
import { AngularResizeEventModule } from 'angular-resize-event';
import { DialogAssistComponent } from './componentes/utils/dialog-assist/dialog-assist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogCustomComponent } from './componentes/utils/dialog-custom/dialog-custom.component';
import { IntersectionObserverDirective } from './directivas/intersection-observer';
import { NotFoundComponent } from './componentes/paginas/not-found/not-found.component';
import { LoginComponent } from './componentes/paginas/login/login.component';
import { PanelPrincipalComponent } from './componentes/paginas/panel-principal/panel-principal.component';
import { DashboardComponent } from './componentes/paginas/dashboard/dashboard.component';
import { RequestInterceptor } from './servicios/request-interceptor/request-interceptor';
import { ManageUsersComponent } from './componentes/paginas/manage-users/manage-users.component';
import { CabeceraComponent } from './componentes/utils/cabecera/cabecera.component';
import { RegisterEditUserComponent } from './componentes/dialogos/register-edit-user/register-edit-user.component';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { DomainSelectorComponent } from './componentes/dialogos/domain-selector/domain-selector.component';
import { ManageDomainsComponent } from './componentes/paginas/manage-domains/manage-domains.component';
import { RegisterEditDomainComponent } from './componentes/dialogos/register-edit-domain/register-edit-domain.component';
import { ManagePostsComponent } from './componentes/paginas/manage-posts/manage-posts.component';
import { CreateEditPostComponent } from './componentes/utils/create-edit-post/create-edit-post.component';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
];

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    DialogAssistComponent,
    DialogCustomComponent,
    IntersectionObserverDirective,
    AutofocusDirective,
    NotFoundComponent,
    LoginComponent,
    PanelPrincipalComponent,
    DashboardComponent,
    ManageUsersComponent,
    CabeceraComponent,
    RegisterEditUserComponent,
    DomainSelectorComponent,
    ManageDomainsComponent,
    RegisterEditDomainComponent,
    ManagePostsComponent,
    CreateEditPostComponent,
  ],
  imports: [
    MatCheckboxModule,
    HttpClientModule,
    MatSelectModule,
    TextFieldModule,
    ReactiveFormsModule,
    NgParticlesModule,
    MatCardModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    AngularResizeEventModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    TableModule,
    RouterModule.forRoot(rutas, {scrollPositionRestoration: 'disabled', onSameUrlNavigation: 'reload'}),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    AnimationGuard,
    httpInterceptorProviders
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})

export class AppModule { }
