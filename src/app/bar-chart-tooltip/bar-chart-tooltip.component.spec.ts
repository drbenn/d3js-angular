import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartTooltipComponent } from './bar-chart-tooltip.component';

describe('BarChartTooltipComponent', () => {
  let component: BarChartTooltipComponent;
  let fixture: ComponentFixture<BarChartTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
