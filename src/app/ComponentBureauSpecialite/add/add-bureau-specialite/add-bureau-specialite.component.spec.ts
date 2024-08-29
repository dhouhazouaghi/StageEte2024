import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBureauSpecialiteComponent } from './add-bureau-specialite.component';

describe('AddBureauSpecialiteComponent', () => {
  let component: AddBureauSpecialiteComponent;
  let fixture: ComponentFixture<AddBureauSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBureauSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBureauSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
