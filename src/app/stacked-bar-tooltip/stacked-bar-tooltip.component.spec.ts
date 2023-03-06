import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarTooltipComponent } from './stacked-bar-tooltip.component';

describe('StackedBarTooltipComponent', () => {
  let component: StackedBarTooltipComponent;
  let fixture: ComponentFixture<StackedBarTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedBarTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
