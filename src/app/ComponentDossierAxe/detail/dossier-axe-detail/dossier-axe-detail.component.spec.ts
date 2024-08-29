import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierAxeDetailComponent } from './dossier-axe-detail.component';

describe('DossierAxeDetailComponent', () => {
  let component: DossierAxeDetailComponent;
  let fixture: ComponentFixture<DossierAxeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierAxeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierAxeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
