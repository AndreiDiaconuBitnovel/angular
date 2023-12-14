import { TestBed } from '@angular/core/testing';

import { TestDbService } from './test-db.service';

describe('TestDbService', () => {
  let service: TestDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
