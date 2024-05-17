import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVisualComponent } from './model-visual.component';

describe('ModelVisualComponent', () => {
  let component: ModelVisualComponent;
  let fixture: ComponentFixture<ModelVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelVisualComponent]
    });
    fixture = TestBed.createComponent(ModelVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
