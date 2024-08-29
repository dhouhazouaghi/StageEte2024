import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTribunalTypeFormComponent } from './add-tribunal-type-form.component';

describe('AddTribunalTypeFormComponent', () => {
  let component: AddTribunalTypeFormComponent;
  let fixture: ComponentFixture<AddTribunalTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTribunalTypeFormComponent]
    })
    .compileComponents(); 
    fixture = TestBed.createComponent(AddTribunalTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
