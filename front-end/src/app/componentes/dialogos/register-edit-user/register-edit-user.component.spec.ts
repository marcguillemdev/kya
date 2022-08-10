import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEditUserComponent } from './register-edit-user.component';

describe('RegisterEditUserComponent', () => {
  let component: RegisterEditUserComponent;
  let fixture: ComponentFixture<RegisterEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEditUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
