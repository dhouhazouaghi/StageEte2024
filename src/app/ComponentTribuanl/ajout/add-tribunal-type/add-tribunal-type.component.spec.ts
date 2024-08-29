import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTribunalTypeComponent } from './add-tribunal-type.component';

describe('AddTribunalTypeComponent', () => {
  let component: AddTribunalTypeComponent;
  let fixture: ComponentFixture<AddTribunalTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTribunalTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTribunalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
