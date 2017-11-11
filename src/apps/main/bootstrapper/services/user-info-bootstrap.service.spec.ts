import { TestBed, inject } from '@angular/core/testing';

import { UserInfoBootstrapService } from './user-info-bootstrap.service';

describe('UserInfoBootstrapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoBootstrapService]
    });
  });

  it('should be created', inject([UserInfoBootstrapService], (service: UserInfoBootstrapService) => {
    expect(service).toBeTruthy();
  }));
});
