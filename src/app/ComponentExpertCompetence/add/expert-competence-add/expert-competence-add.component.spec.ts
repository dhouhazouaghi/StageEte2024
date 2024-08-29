import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertCompetenceAddComponent } from './expert-competence-add.component';

describe('ExpertCompetenceAddComponent', () => {
  let component: ExpertCompetenceAddComponent;
  let fixture: ComponentFixture<ExpertCompetenceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertCompetenceAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertCompetenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
