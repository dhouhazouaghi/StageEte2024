import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugementTypeDetailsComponent } from './jugement-type-details.component';

describe('JugementTypeDetailsComponent', () => {
  let component: JugementTypeDetailsComponent;
  let fixture: ComponentFixture<JugementTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugementTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugementTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
