import { TestBed, inject } from '@angular/core/testing';

import { ChildAppsBootstrapService } from './child-apps-bootstrap.service';

describe('ChildAppsBootstrapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildAppsBootstrapService]
    });
  });

  it('should be created', inject([ChildAppsBootstrapService], (service: ChildAppsBootstrapService) => {
    expect(service).toBeTruthy();
  }));
});
