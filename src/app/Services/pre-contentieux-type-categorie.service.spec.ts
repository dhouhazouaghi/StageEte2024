import { TestBed } from '@angular/core/testing';

import { PreContentieuxTypeCategorieService } from './pre-contentieux-type-categorie.service';

describe('PreContentieuxTypeCategorieService', () => {
  let service: PreContentieuxTypeCategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreContentieuxTypeCategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
