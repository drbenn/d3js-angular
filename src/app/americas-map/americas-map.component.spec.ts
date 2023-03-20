import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmericasMapComponent } from './americas-map.component';

describe('AmericasMapComponent', () => {
  let component: AmericasMapComponent;
  let fixture: ComponentFixture<AmericasMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmericasMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmericasMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
