import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDossierSousCategorieComponent } from './detail-dossier-sous-categorie.component';

describe('DetailDossierSousCategorieComponent', () => {
  let component: DetailDossierSousCategorieComponent;
  let fixture: ComponentFixture<DetailDossierSousCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDossierSousCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailDossierSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
