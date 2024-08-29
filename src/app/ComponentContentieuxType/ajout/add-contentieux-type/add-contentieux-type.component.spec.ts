import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContentieuxTypeComponent } from './add-contentieux-type.component';

describe('AddContentieuxTypeComponent', () => {
  let component: AddContentieuxTypeComponent;
  let fixture: ComponentFixture<AddContentieuxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContentieuxTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddContentieuxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
