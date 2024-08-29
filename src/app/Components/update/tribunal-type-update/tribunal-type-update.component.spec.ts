import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunalTypeUpdateComponent } from './tribunal-type-update.component';

describe('TribunalTypeUpdateComponent', () => {
  let component: TribunalTypeUpdateComponent;
  let fixture: ComponentFixture<TribunalTypeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TribunalTypeUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TribunalTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
