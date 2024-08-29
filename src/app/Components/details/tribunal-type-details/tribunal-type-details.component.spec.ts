import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunalTypeDetailsComponent } from './tribunal-type-details.component';

describe('TribunalTypeDetailsComponent', () => {
  let component: TribunalTypeDetailsComponent;
  let fixture: ComponentFixture<TribunalTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TribunalTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TribunalTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
