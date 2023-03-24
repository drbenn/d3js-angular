import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptCircleTweenComponent } from './gpt-circle-tween.component';

describe('GptCircleTweenComponent', () => {
  let component: GptCircleTweenComponent;
  let fixture: ComponentFixture<GptCircleTweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GptCircleTweenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GptCircleTweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
