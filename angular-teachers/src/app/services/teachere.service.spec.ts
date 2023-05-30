import { TestBed } from '@angular/core/testing';

import { TeachereService } from './teachere.service';

describe('TeachereService', () => {
  let service: TeachereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
