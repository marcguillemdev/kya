import { ManagePostsComponent } from './../componentes/paginas/manage-posts/manage-posts.component';
import { ManageDomainsComponent } from './../componentes/paginas/manage-domains/manage-domains.component';
import { LoginComponent } from './../componentes/paginas/login/login.component';
import { Routes } from "@angular/router";
import { AnimationGuard } from '../guardianes/animation.guard';
import { PagesId } from "./pages";
import { PanelPrincipalComponent } from '../componentes/paginas/panel-principal/panel-principal.component';
import { AuthGuard } from '../guardianes/auth.guard';
import { DashboardComponent } from '../componentes/paginas/dashboard/dashboard.component';
import { NotFoundComponent } from '../componentes/paginas/not-found/not-found.component';
import { ManageUsersComponent } from '../componentes/paginas/manage-users/manage-users.component';
import { AdminGuard } from '../guardianes/admin.guard';
import { CreateEditPostComponent } from '../componentes/utils/create-edit-post/create-edit-post.component';

const titulos: string[] = [
  "Quarzum Agencia de diseño web | Páginas web corporativas a medida",
  "Contacto | Quarzum Agencia de diseño web",
  "Preguntas frecuentes | Quarzum Agencia de diseño web",
  "Política de cookies | Quarzum Agencia de diseño web"
];

export const rutas: Routes = [
  {path: PagesId.LOGIN, component: LoginComponent, canActivate: [AnimationGuard], title: "KYA: Inicio de sesión"},
  {path: PagesId.DASHBOARD, component: DashboardComponent, canActivate: [AuthGuard, AnimationGuard], title: "KYA: Panel principal", children: [
    {path: "", component: PanelPrincipalComponent, canActivate: [AnimationGuard], title: titulos[0]},
    {path: PagesId.MANAGE_POSTS, component: ManagePostsComponent, canActivate: [AnimationGuard], title: "KYA: Gestion de posts"},
    {path: PagesId.CREATE_POST, component: CreateEditPostComponent, canActivate: [AnimationGuard], title: "KYA: Crear post"},
    {path: PagesId.MANAGE_USERS, component: ManageUsersComponent, canActivate: [AnimationGuard, AdminGuard], title: "KYA: Gestion de usuarios"},
    {path: PagesId.MANAGE_DOMAINS, component: ManageDomainsComponent, canActivate: [AnimationGuard, AdminGuard], title: "KYA: Gestion de dominios"}
  ]},
  {path: '', redirectTo: '/', pathMatch: 'full'},
  //404 ERROR PAGE
  {path: '**', redirectTo: PagesId.LOGIN, pathMatch: 'full'}
];
