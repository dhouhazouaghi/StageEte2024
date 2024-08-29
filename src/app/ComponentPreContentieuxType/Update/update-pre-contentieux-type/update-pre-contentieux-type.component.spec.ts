import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreContentieuxTypeComponent } from './update-pre-contentieux-type.component';

describe('UpdatePreContentieuxTypeComponent', () => {
  let component: UpdatePreContentieuxTypeComponent;
  let fixture: ComponentFixture<UpdatePreContentieuxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePreContentieuxTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePreContentieuxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
