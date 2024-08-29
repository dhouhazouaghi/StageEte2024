import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierCategorieComponent } from './dossier-categorie.component';

describe('DossierCategorieComponent', () => {
  let component: DossierCategorieComponent;
  let fixture: ComponentFixture<DossierCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
