import { TestBed } from '@angular/core/testing';

import { ResApiService } from './res-api.service';

describe('ResApiService', () => {
  let service: ResApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
