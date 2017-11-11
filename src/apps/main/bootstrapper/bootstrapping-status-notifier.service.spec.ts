import { TestBed, inject } from '@angular/core/testing';

import { BootstrappingStatusNotifierService } from './bootstrapping-status-notifier.service';

describe('BootstrappingStatusNotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BootstrappingStatusNotifierService]
    });
  });

  it('should be created', inject([BootstrappingStatusNotifierService], (service: BootstrappingStatusNotifierService) => {
    expect(service).toBeTruthy();
  }));
});
