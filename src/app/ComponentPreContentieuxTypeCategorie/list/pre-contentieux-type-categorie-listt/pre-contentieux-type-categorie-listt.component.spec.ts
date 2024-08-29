import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreContentieuxTypeCategorieListtComponent } from './pre-contentieux-type-categorie-listt.component';

describe('PreContentieuxTypeCategorieListtComponent', () => {
  let component: PreContentieuxTypeCategorieListtComponent;
  let fixture: ComponentFixture<PreContentieuxTypeCategorieListtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreContentieuxTypeCategorieListtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreContentieuxTypeCategorieListtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
