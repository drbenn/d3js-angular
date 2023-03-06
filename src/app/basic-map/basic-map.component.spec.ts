import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicMapComponent } from './basic-map.component';

describe('BasicMapComponent', () => {
  let component: BasicMapComponent;
  let fixture: ComponentFixture<BasicMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
