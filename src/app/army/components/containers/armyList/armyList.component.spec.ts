import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmyListComponent } from './armyList.component';

describe('ArmyListComponent', () => {
  let component: ArmyListComponent;
  let fixture: ComponentFixture<ArmyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmyListComponent],
    });
    fixture = TestBed.createComponent(ArmyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
