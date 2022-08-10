import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPrincipalComponent } from './panel-principal.component';

describe('PanelPrincipalComponent', () => {
  let component: PanelPrincipalComponent;
  let fixture: ComponentFixture<PanelPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
