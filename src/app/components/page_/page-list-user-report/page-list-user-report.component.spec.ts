import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListUserReportComponent } from './page-list-user-report.component';

describe('PageListUserReportComponent', () => {
  let component: PageListUserReportComponent;
  let fixture: ComponentFixture<PageListUserReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListUserReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListUserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
