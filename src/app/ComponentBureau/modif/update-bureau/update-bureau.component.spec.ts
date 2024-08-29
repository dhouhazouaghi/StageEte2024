import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBureauComponent } from './update-bureau.component';

describe('UpdateBureauComponent', () => {
  let component: UpdateBureauComponent;
  let fixture: ComponentFixture<UpdateBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBureauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
