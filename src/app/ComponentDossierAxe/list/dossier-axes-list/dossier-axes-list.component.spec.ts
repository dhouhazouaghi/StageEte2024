import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierAxesListComponent } from './dossier-axes-list.component';

describe('DossierAxesListComponent', () => {
  let component: DossierAxesListComponent;
  let fixture: ComponentFixture<DossierAxesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierAxesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierAxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
