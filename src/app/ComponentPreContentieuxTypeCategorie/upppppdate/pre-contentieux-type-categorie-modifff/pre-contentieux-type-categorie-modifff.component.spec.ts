import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreContentieuxTypeCategorieMODIFFFComponent } from './pre-contentieux-type-categorie-modifff.component';

describe('PreContentieuxTypeCategorieMODIFFFComponent', () => {
  let component: PreContentieuxTypeCategorieMODIFFFComponent;
  let fixture: ComponentFixture<PreContentieuxTypeCategorieMODIFFFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreContentieuxTypeCategorieMODIFFFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreContentieuxTypeCategorieMODIFFFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
