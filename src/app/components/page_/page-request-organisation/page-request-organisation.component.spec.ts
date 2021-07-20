import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRequestOrganisationComponent } from './page-request-organisation.component';

describe('PageRequestOrganisationComponent', () => {
  let component: PageRequestOrganisationComponent;
  let fixture: ComponentFixture<PageRequestOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRequestOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRequestOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
