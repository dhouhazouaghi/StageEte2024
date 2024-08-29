import { TestBed } from '@angular/core/testing';

import { DossierSousCategorieService } from './dossier-sous-categorie.service';

describe('DossierSousCategorieService', () => {
  let service: DossierSousCategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierSousCategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
