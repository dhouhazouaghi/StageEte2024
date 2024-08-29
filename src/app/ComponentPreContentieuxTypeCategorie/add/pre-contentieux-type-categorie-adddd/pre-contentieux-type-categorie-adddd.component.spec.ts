import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreContentieuxTypeCategorieADDDDComponent } from './pre-contentieux-type-categorie-adddd.component';

describe('PreContentieuxTypeCategorieADDDDComponent', () => {
  let component: PreContentieuxTypeCategorieADDDDComponent;
  let fixture: ComponentFixture<PreContentieuxTypeCategorieADDDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreContentieuxTypeCategorieADDDDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreContentieuxTypeCategorieADDDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
