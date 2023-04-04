import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NordicAirForceDemoComponent } from './nordic-air-force-demo.component';

describe('NordicAirForceDemoComponent', () => {
  let component: NordicAirForceDemoComponent;
  let fixture: ComponentFixture<NordicAirForceDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NordicAirForceDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NordicAirForceDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
