import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierPieceJointeAddComponent } from './dossier-piece-jointe-add.component';

describe('DossierPieceJointeAddComponent', () => {
  let component: DossierPieceJointeAddComponent;
  let fixture: ComponentFixture<DossierPieceJointeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierPieceJointeAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierPieceJointeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
