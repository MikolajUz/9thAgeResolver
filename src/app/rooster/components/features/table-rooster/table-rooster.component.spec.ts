import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRoosterComponent } from './table-rooster.component';

describe('TableArmyComponent', () => {
  let component: TableRoosterComponent;
  let fixture: ComponentFixture<TableRoosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableRoosterComponent],
    });
    fixture = TestBed.createComponent(TableRoosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
