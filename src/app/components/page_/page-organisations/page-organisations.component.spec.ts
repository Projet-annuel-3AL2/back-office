import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOrganisationsComponent } from './page-organisations.component';

describe('PageOrganisationsComponent', () => {
  let component: PageOrganisationsComponent;
  let fixture: ComponentFixture<PageOrganisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageOrganisationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
