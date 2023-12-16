import { TestBed } from '@angular/core/testing';

import { AuthServiceExtensionService } from './auth-service-extension.service';

describe('AuthServiceExtensionService', () => {
  let service: AuthServiceExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
