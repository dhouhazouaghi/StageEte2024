import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContentieuxTypeComponent } from './update-contentieux-type.component';

describe('UpdateContentieuxTypeComponent', () => {
  let component: UpdateContentieuxTypeComponent;
  let fixture: ComponentFixture<UpdateContentieuxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContentieuxTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateContentieuxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
