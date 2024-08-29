import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBureauTypeComponent } from './update-bureau-type.component';

describe('UpdateBureauTypeComponent', () => {
  let component: UpdateBureauTypeComponent;
  let fixture: ComponentFixture<UpdateBureauTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBureauTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBureauTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
