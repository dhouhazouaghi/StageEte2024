import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierCategorieUpdateComponent } from './dossier-categorie-update.component';

describe('DossierCategorieUpdateComponent', () => {
  let component: DossierCategorieUpdateComponent;
  let fixture: ComponentFixture<DossierCategorieUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierCategorieUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierCategorieUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
