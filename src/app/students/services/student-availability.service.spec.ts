import { TestBed } from '@angular/core/testing';

import { StudentAvailabilityService } from './student-availability.service';

describe('StudentAvailabilityService', () => {
  let service: StudentAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
