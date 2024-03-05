import { RegistrationHistoryServiceService } from './registration-history-service.service';
import { TestBed } from '@angular/core/testing';

describe('RegistrationHistoryServiceService', () => {
  let service: RegistrationHistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationHistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
