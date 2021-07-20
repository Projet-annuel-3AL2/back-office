import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListOrganisationReportComponent } from './page-list-organisation-report.component';

describe('PageListOrganisationReportComponent', () => {
  let component: PageListOrganisationReportComponent;
  let fixture: ComponentFixture<PageListOrganisationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListOrganisationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListOrganisationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
