import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossierAxeComponent } from './add-dossier-axe.component';

describe('AddDossierAxeComponent', () => {
  let component: AddDossierAxeComponent;
  let fixture: ComponentFixture<AddDossierAxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDossierAxeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDossierAxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
