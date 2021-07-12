import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRequestsCertificationComponent } from './page-requests-certification.component';

describe('PageRequestsCertificationComponent', () => {
  let component: PageRequestsCertificationComponent;
  let fixture: ComponentFixture<PageRequestsCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRequestsCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRequestsCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
