import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJugementTypeComponent } from './update-jugement-type.component';

describe('UpdateJugementTypeComponent', () => {
  let component: UpdateJugementTypeComponent;
  let fixture: ComponentFixture<UpdateJugementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateJugementTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateJugementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
