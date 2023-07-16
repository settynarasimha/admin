import { TestBed } from '@angular/core/testing';

import { SignserviceService } from './signservice.service';

describe('SignserviceService', () => {
  let service: SignserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
