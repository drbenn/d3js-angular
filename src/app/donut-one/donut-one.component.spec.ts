import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutOneComponent } from './donut-one.component';

describe('DonutOneComponent', () => {
  let component: DonutOneComponent;
  let fixture: ComponentFixture<DonutOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonutOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
