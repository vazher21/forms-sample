import { TestBed } from '@angular/core/testing';

import { StudentFormGradesService } from './student-form-grades.service';

describe('StudentFormGradesService', () => {
  let service: StudentFormGradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFormGradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
