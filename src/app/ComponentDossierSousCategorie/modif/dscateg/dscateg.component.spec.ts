import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSCategComponent } from './dscateg.component';

describe('DSCategComponent', () => {
  let component: DSCategComponent;
  let fixture: ComponentFixture<DSCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DSCategComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DSCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
