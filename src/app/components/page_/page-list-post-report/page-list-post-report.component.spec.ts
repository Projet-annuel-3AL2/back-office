import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListPostReportComponent } from './page-list-post-report.component';

describe('PageListPostReportComponent', () => {
  let component: PageListPostReportComponent;
  let fixture: ComponentFixture<PageListPostReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListPostReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListPostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
