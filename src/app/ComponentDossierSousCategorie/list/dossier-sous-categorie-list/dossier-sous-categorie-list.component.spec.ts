import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSousCategorieListComponent } from './dossier-sous-categorie-list.component';

describe('DossierSousCategorieListComponent', () => {
  let component: DossierSousCategorieListComponent;
  let fixture: ComponentFixture<DossierSousCategorieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierSousCategorieListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierSousCategorieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
