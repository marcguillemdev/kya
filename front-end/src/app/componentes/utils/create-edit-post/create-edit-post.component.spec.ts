import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPostComponent } from './create-edit-post.component';

describe('CreateEditPostComponent', () => {
  let component: CreateEditPostComponent;
  let fixture: ComponentFixture<CreateEditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
