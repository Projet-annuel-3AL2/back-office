import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOrganisationComponent } from './page-organisation.component';

describe('PageOrganisationComponent', () => {
  let component: PageOrganisationComponent;
  let fixture: ComponentFixture<PageOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
