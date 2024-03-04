import { GetApplicationByStatusService } from './get-application-by-status.service';
import { TestBed } from '@angular/core/testing';

describe('GetApplicationByStatusService', () => {
  let service: GetApplicationByStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetApplicationByStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
