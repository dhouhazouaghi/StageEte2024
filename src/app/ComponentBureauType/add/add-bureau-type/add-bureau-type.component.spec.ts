import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBureauTypeComponent } from './add-bureau-type.component';

describe('AddBureauTypeComponent', () => {
  let component: AddBureauTypeComponent;
  let fixture: ComponentFixture<AddBureauTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBureauTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBureauTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
