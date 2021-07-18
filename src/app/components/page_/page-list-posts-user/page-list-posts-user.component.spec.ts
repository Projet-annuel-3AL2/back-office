import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListPostsUserComponent } from './page-list-posts-user.component';

describe('PageListPostsUserComponent', () => {
  let component: PageListPostsUserComponent;
  let fixture: ComponentFixture<PageListPostsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListPostsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListPostsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
