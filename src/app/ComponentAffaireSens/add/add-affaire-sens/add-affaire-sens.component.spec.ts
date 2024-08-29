import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffaireSensComponent } from './add-affaire-sens.component';

describe('AddAffaireSensComponent', () => {
  let component: AddAffaireSensComponent;
  let fixture: ComponentFixture<AddAffaireSensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAffaireSensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAffaireSensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
