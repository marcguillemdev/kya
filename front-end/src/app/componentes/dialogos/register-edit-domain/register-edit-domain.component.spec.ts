import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEditDomainComponent } from './register-edit-domain.component';

describe('RegisterEditDomainComponent', () => {
  let component: RegisterEditDomainComponent;
  let fixture: ComponentFixture<RegisterEditDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEditDomainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEditDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
