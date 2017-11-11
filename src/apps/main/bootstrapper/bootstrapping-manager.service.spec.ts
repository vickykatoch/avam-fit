import { TestBed, inject } from '@angular/core/testing';

import { BootstrappingManagerService } from './bootstrapping-manager.service';

describe('BootstrappingManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BootstrappingManagerService]
    });
  });

  it('should be created', inject([BootstrappingManagerService], (service: BootstrappingManagerService) => {
    expect(service).toBeTruthy();
  }));
});
