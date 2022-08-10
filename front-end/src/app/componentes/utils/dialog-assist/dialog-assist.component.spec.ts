import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssistComponent } from './dialog-assist.component';

describe('DialogAssistComponent', () => {
  let component: DialogAssistComponent;
  let fixture: ComponentFixture<DialogAssistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
