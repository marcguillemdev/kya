import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainSelectorComponent } from './domain-selector.component';

describe('DomainSelectorComponent', () => {
  let component: DomainSelectorComponent;
  let fixture: ComponentFixture<DomainSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
