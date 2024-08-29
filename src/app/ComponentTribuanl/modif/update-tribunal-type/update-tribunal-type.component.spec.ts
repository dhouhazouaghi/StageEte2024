import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTribunalTypeComponent } from './update-tribunal-type.component';

describe('UpdateTribunalTypeComponent', () => {
  let component: UpdateTribunalTypeComponent;
  let fixture: ComponentFixture<UpdateTribunalTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTribunalTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTribunalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
