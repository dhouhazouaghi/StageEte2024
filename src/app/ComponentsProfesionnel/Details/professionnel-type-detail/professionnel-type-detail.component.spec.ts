import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionnelTypeDetailComponent } from './professionnel-type-detail.component';

describe('ProfessionnelTypeDetailComponent', () => {
  let component: ProfessionnelTypeDetailComponent;
  let fixture: ComponentFixture<ProfessionnelTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionnelTypeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessionnelTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
