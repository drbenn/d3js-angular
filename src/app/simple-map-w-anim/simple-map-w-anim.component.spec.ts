import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMapWAnimComponent } from './simple-map-w-anim.component';

describe('SimpleMapWAnimComponent', () => {
  let component: SimpleMapWAnimComponent;
  let fixture: ComponentFixture<SimpleMapWAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleMapWAnimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleMapWAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
