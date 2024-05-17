import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitVisualComponent } from './unit-visual.component';

describe('UnitUIComponent', () => {
  let component: UnitVisualComponent;
  let fixture: ComponentFixture<UnitVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitVisualComponent],
    });
    fixture = TestBed.createComponent(UnitVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
