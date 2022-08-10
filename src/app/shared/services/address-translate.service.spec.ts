import { TestBed } from '@angular/core/testing';

import { AddressTranslateService } from './address-translate.service';

describe('AddressTranslateService', () => {
  let service: AddressTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
