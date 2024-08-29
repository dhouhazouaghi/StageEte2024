import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExCompComponent } from './update-ex-comp.component';

describe('UpdateExCompComponent', () => {
  let component: UpdateExCompComponent;
  let fixture: ComponentFixture<UpdateExCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateExCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateExCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
