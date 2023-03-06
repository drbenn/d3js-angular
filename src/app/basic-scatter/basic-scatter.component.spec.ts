import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicScatterComponent } from './basic-scatter.component';

describe('BasicScatterComponent', () => {
  let component: BasicScatterComponent;
  let fixture: ComponentFixture<BasicScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
