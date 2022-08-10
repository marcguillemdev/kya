import { SeoService } from 'src/app/servicios/seo/seo.service';
import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UpdateService } from '../servicios/update-service/update.service';
import { fromIntersectionObserver, IntersectionStatus } from './intersection-observer-assist';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[animate]'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];
  @Input() parentComponent: string;
  @Input() delay: number = 0;

  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();

  private parentComponentArray: string[] = ["sideNav"];

  private destroy$ = new Subject();

  constructor(
    private element: ElementRef,
    private updateService: UpdateService,
    private seoService: SeoService
  ) {}

  async ngOnInit() {
    const element = this.element.nativeElement as HTMLElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    if(this.findParentComponentInArray(this.parentComponent) ){
      return;
    }
    //console.log("Adding classes to element: ", element);
    element.classList.add("hide-for-animation");
    element.classList.add("animate__animated");

    let currentViewport = await firstValueFrom(this.updateService.currentViewport);

    if(currentViewport === 'xs' || currentViewport === 'sm') {
      this.delay = 0;
      //console.log("Delay eliminado para dispositivos pequeños");
    }

    fromIntersectionObserver(
      element,
      config,
      this.intersectionDebounce,
      this.delay
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe((status) => {
      this.visibilityChange.emit(status);
    });
  }

  findParentComponentInArray(parentComponent: string): boolean {
    if(parentComponent) {
      return this.parentComponentArray.filter(component => component.toLowerCase() === parentComponent.toLowerCase()).length > 0;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
