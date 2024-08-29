import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfessionnelTypeComponent } from './update-professionnel-type.component';

describe('UpdateProfessionnelTypeComponent', () => {
  let component: UpdateProfessionnelTypeComponent;
  let fixture: ComponentFixture<UpdateProfessionnelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfessionnelTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProfessionnelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
