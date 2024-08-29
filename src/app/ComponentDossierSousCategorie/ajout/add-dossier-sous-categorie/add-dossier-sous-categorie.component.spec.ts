import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossierSousCategorieComponent } from './add-dossier-sous-categorie.component';

describe('AddDossierSousCategorieComponent', () => {
  let component: AddDossierSousCategorieComponent;
  let fixture: ComponentFixture<AddDossierSousCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDossierSousCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDossierSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
