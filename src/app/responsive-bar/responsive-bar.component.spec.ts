import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveBarComponent } from './responsive-bar.component';

describe('ResponsiveBarComponent', () => {
  let component: ResponsiveBarComponent;
  let fixture: ComponentFixture<ResponsiveBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
