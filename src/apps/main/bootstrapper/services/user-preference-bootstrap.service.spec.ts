import { TestBed, inject } from '@angular/core/testing';

import { UserPreferenceBootstrapService } from './user-preference-bootstrap.service';

describe('UserPreferenceBootstrapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPreferenceBootstrapService]
    });
  });

  it('should be created', inject([UserPreferenceBootstrapService], (service: UserPreferenceBootstrapService) => {
    expect(service).toBeTruthy();
  }));
});
