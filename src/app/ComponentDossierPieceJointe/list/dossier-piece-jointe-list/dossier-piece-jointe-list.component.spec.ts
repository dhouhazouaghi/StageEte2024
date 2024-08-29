import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierPieceJointeListComponent } from './dossier-piece-jointe-list.component';

describe('DossierPieceJointeListComponent', () => {
  let component: DossierPieceJointeListComponent;
  let fixture: ComponentFixture<DossierPieceJointeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierPieceJointeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierPieceJointeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
