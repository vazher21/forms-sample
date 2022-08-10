import { TestBed } from '@angular/core/testing';

import { StudentsHttpService } from './students-http.service';

describe('StudentsHttpService', () => {
  let service: StudentsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
