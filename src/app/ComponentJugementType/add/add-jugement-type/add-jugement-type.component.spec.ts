import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJugementTypeComponent } from './add-jugement-type.component';

describe('AddJugementTypeComponent', () => {
  let component: AddJugementTypeComponent;
  let fixture: ComponentFixture<AddJugementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJugementTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJugementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
