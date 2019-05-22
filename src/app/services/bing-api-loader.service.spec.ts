import { TestBed } from '@angular/core/testing';

import { BingApiLoaderService } from './bing-api-loader.service';

describe('BingApiLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BingApiLoaderService = TestBed.get(BingApiLoaderService);
    expect(service).toBeTruthy();
  });
});
