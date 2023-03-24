import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedrawOnResizeComponent } from './redraw-on-resize.component';

describe('RedrawOnResizeComponent', () => {
  let component: RedrawOnResizeComponent;
  let fixture: ComponentFixture<RedrawOnResizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedrawOnResizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedrawOnResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
