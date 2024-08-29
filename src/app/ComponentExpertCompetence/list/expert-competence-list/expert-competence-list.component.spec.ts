import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertCompetenceListComponent } from './expert-competence-list.component';

describe('ExpertCompetenceListComponent', () => {
  let component: ExpertCompetenceListComponent;
  let fixture: ComponentFixture<ExpertCompetenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertCompetenceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertCompetenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
