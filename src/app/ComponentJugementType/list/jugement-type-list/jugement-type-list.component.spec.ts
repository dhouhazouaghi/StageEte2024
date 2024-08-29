import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugementTypeListComponent } from './jugement-type-list.component';

describe('JugementTypeListComponent', () => {
  let component: JugementTypeListComponent;
  let fixture: ComponentFixture<JugementTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugementTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugementTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
