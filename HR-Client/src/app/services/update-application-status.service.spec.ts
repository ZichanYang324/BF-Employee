import { UpdateApplicationStatusService } from './update-application-status.service';
import { TestBed } from '@angular/core/testing';

describe('UpdateApplicationStatusService', () => {
  let service: UpdateApplicationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateApplicationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
