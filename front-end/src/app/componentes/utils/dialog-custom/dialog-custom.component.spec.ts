import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomComponent } from './dialog-custom.component';

describe('DialogCustomComponent', () => {
  let component: DialogCustomComponent;
  let fixture: ComponentFixture<DialogCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
