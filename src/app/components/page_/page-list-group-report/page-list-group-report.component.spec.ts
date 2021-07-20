import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListGroupReportComponent } from './page-list-group-report.component';

describe('PageListGroupReportComponent', () => {
  let component: PageListGroupReportComponent;
  let fixture: ComponentFixture<PageListGroupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListGroupReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListGroupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
