import { PagesId } from './../../../constantes/pages';
import { Component, Injector, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UpdateService } from 'src/app/servicios/update-service/update.service';
import { SeoService } from 'src/app/servicios/seo/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  public currentViewport: string;
  public pagesId = PagesId;

  constructor(
    private updateService: UpdateService,
    private seoService: SeoService
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.listenViewport();
  }

  listenViewport(): void {
    this.updateService.currentViewport.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      respuesta => {
        this.currentViewport = respuesta;
        this.seoService.setDescription("No hemos encontrado la página que buscas :( Puedes ver nuestros servicios en la sección de servicios.");
      }
    );
  }

}
