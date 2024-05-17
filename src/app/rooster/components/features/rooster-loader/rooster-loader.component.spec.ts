import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoosterLoaderComponent } from './rooster-loader.component';

describe('GetRoosterComponent', () => {
  let component: RoosterLoaderComponent;
  let fixture: ComponentFixture<RoosterLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoosterLoaderComponent],
    });
    fixture = TestBed.createComponent(RoosterLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
