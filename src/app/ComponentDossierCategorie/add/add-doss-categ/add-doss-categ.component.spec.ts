import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossCategComponent } from './add-doss-categ.component';

describe('AddDossCategComponent', () => {
  let component: AddDossCategComponent;
  let fixture: ComponentFixture<AddDossCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDossCategComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDossCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
