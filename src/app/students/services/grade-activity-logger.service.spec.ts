import { TestBed } from '@angular/core/testing';

import { GradeActivityLoggerService } from './grade-activity-logger.service';

describe('GradeActivityLoggerService', () => {
  let service: GradeActivityLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeActivityLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
