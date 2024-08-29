import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffaireSensComponent } from './update-affaire-sens.component';

describe('UpdateAffaireSensComponent', () => {
  let component: UpdateAffaireSensComponent;
  let fixture: ComponentFixture<UpdateAffaireSensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAffaireSensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAffaireSensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
