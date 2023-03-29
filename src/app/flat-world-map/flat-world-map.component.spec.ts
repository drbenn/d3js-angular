import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatWorldMapComponent } from './flat-world-map.component';

describe('FlatWorldMapComponent', () => {
  let component: FlatWorldMapComponent;
  let fixture: ComponentFixture<FlatWorldMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatWorldMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatWorldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
