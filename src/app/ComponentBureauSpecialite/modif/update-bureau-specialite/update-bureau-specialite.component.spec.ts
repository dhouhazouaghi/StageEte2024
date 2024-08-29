import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBureauSpecialiteComponent } from './update-bureau-specialite.component';

describe('UpdateBureauSpecialiteComponent', () => {
  let component: UpdateBureauSpecialiteComponent;
  let fixture: ComponentFixture<UpdateBureauSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBureauSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBureauSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
