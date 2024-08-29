import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatDetailComponent } from './etat-detail.component';

describe('EtatDetailComponent', () => {
  let component: EtatDetailComponent;
  let fixture: ComponentFixture<EtatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
