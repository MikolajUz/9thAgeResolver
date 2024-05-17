import { TestBed } from '@angular/core/testing';

import { RoosterService } from './rooster.service';

describe('RoosterService', () => {
  let service: RoosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
