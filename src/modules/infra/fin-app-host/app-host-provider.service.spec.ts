import { TestBed, inject } from '@angular/core/testing';

import { FinAppHostProviderService } from './app-host-provider.service';

describe('AppHostProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinAppHostProviderService]
    });
  });

  it('should be created', inject([FinAppHostProviderService], (service: FinAppHostProviderService) => {
    expect(service).toBeTruthy();
  }));
});
