import { TestBed } from '@angular/core/testing';

import { ArmyService } from './army.service';

describe('ArmyServiceService', () => {
  let service: ArmyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
