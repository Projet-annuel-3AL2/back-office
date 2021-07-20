import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListCertificationComponent } from './page-list-certification.component';

describe('PageListCertificationComponent', () => {
  let component: PageListCertificationComponent;
  let fixture: ComponentFixture<PageListCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
