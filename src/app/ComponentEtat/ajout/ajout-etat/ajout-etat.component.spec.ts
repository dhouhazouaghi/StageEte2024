import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEtatComponent } from './ajout-etat.component';

describe('AjoutEtatComponent', () => {
  let component: AjoutEtatComponent;
  let fixture: ComponentFixture<AjoutEtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEtatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
