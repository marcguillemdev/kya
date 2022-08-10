import { PagesId } from 'src/app/constantes/pages';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogTypes } from 'src/app/constantes/dialogTypes';
import { Domain } from 'src/app/modelos/domain';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { DialogAsistService } from 'src/app/servicios/dialog-assist/dialog-asist.service';
import { DomainService } from 'src/app/servicios/domain/domain.service';
import { UpdateService } from 'src/app/servicios/update-service/update.service';
import { PostsService } from 'src/app/servicios/posts/posts.service';
import { Post } from 'src/app/modelos/post';


@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  public postSeleccionado: Post;
  public posts: Post[];
  public selectedProduct1: any;
  public currentViewport: string;

  constructor(
    private postsService: PostsService,
    private dialogAsistService: DialogAsistService,
    private updateService: UpdateService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getPost();

    console.table(this.posts);
  }

  async getPost(): Promise<void> {
    this.posts = await firstValueFrom(this.postsService.getAllPosts());
  }

  refresh(): void {
    this.getPost();
  }

  async deletePost(): Promise<void> {
    /*let respuesta: boolean = await firstValueFrom(
      this.dialogAsistService.abrirMensajeDialogoCustom("Eliminar post", "¿Deseas eliminar el post " + this.postSeleccionado.domainName + "? <br> Se desvincularán todos los usuarios y posts.", DialogTypes.yesNo).afterClosed());
    if (respuesta) {
      await firstValueFrom(this.postsService.deleteDomain(this.postSeleccionado));
      this.getPost();
    }*/
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

  async addPost(): Promise<void> {
    this.router.navigate([PagesId.DASHBOARD + "/" + PagesId.CREATE_POST]);
  }

  async editPost(): Promise<void> {

  }

  onRowSelect(event) {
    this.postSeleccionado = event.data;
  }

  onRowUnselect(event) {
    this.postSeleccionado = null;
  }


}
