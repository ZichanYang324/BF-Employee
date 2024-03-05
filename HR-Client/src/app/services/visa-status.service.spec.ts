import { TestBed } from '@angular/core/testing';

import { HrVisaStatusService } from './visa-status.service';

describe('VisaStatusService', () => {
  let service: HrVisaStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HrVisaStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
