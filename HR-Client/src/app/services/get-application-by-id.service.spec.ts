import { GetApplicationByIdService } from './get-application-by-id.service';
import { TestBed } from '@angular/core/testing';

describe('GetApplicationByIdService', () => {
  let service: GetApplicationByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetApplicationByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
