import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowPictureComponent } from './dialog-show-picture.component';

describe('DialogShowPictureComponent', () => {
  let component: DialogShowPictureComponent;
  let fixture: ComponentFixture<DialogShowPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
