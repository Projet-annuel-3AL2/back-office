import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListEventReportComponent } from './page-list-event-report.component';

describe('PageListEventReportComponent', () => {
  let component: PageListEventReportComponent;
  let fixture: ComponentFixture<PageListEventReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListEventReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListEventReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
