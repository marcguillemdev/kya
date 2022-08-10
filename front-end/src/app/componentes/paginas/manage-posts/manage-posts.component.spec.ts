import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePostsComponent } from './manage-posts.component';

describe('ManagePostsComponent', () => {
  let component: ManagePostsComponent;
  let fixture: ComponentFixture<ManagePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
