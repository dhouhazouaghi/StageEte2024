import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSjtContentieuxComponent } from './update-sjt-contentieux.component';

describe('UpdateSjtContentieuxComponent', () => {
  let component: UpdateSjtContentieuxComponent;
  let fixture: ComponentFixture<UpdateSjtContentieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSjtContentieuxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSjtContentieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
