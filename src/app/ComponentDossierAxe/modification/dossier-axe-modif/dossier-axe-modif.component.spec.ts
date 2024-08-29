import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierAxeModifComponent } from './dossier-axe-modif.component';

describe('DossierAxeModifComponent', () => {
  let component: DossierAxeModifComponent;
  let fixture: ComponentFixture<DossierAxeModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierAxeModifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierAxeModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
