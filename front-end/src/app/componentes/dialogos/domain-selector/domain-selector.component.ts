import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Domain } from 'src/app/modelos/domain';
import { DomainService } from 'src/app/servicios/domain/domain.service';
import { UpdateService } from 'src/app/servicios/update-service/update.service';

@Component({
  selector: 'app-domain-selector',
  templateUrl: './domain-selector.component.html',
  styleUrls: ['./domain-selector.component.css']
})
export class DomainSelectorComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  public selectedButton: string;
  public domains: Domain[];
  public selectedValueDomain: number;
  public currentDomainId: number;

  constructor(
    private domainService: DomainService,
    private updateService: UpdateService,
    private matRef: MatDialogRef<DomainSelectorComponent>
  ) { }

  ngOnInit(): void {
    this.getDomains();
    this.currentDomainId = +localStorage.getItem("website");
  }

  setWebsite(value: number): void {
    console.log(value);
    localStorage.setItem("website", value.toString());
    this.updateService.currentWorkingDomain.next(this.selectedValueDomain);
    this.matRef.close();
  }

  getDomains(): void {
    this.domainService.getDomains().subscribe(
      respuesta => {
        console.log(respuesta);
        this.domains = respuesta;
      }
    );
  }

}
