import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldComponent } from './battlefield.component';

describe('BattlefieldComponent', () => {
  let component: BattlefieldComponent;
  let fixture: ComponentFixture<BattlefieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattlefieldComponent]
    });
    fixture = TestBed.createComponent(BattlefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
