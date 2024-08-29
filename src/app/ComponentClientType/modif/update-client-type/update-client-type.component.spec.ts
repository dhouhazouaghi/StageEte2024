import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientTypeComponent } from './update-client-type.component';

describe('UpdateClientTypeComponent', () => {
  let component: UpdateClientTypeComponent;
  let fixture: ComponentFixture<UpdateClientTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateClientTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateClientTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
