import { TestBed, inject } from '@angular/core/testing';

import { AppconfigBootstrapService } from './appconfig-bootstrap.service';

describe('AppconfigBootstrapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppconfigBootstrapService]
    });
  });

  it('should be created', inject([AppconfigBootstrapService], (service: AppconfigBootstrapService) => {
    expect(service).toBeTruthy();
  }));
});
