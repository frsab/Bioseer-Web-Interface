import { TestBed } from '@angular/core/testing';

import { SiteConditionsService } from './site-conditions.service';

describe('SiteConditionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteConditionsService = TestBed.get(SiteConditionsService);
    expect(service).toBeTruthy();
  });
});
