import { TestBed, inject } from '@angular/core/testing';

import { FinAppHostFactoryService } from './app-host-factory.service';

describe('AppHostFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinAppHostFactoryService]
    });
  });

  it('should be created', inject([FinAppHostFactoryService], (service: FinAppHostFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
