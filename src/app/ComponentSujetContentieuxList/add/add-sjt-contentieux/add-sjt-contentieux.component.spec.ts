import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSjtContentieuxComponent } from './add-sjt-contentieux.component';

describe('AddSjtContentieuxComponent', () => {
  let component: AddSjtContentieuxComponent;
  let fixture: ComponentFixture<AddSjtContentieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSjtContentieuxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSjtContentieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
