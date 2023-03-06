import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPieComponent } from './basic-pie.component';

describe('BasicPieComponent', () => {
  let component: BasicPieComponent;
  let fixture: ComponentFixture<BasicPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
