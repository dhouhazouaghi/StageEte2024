import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunalTypeAddComponent } from './tribunal-type-add.component';

describe('TribunalTypeAddComponent', () => {
  let component: TribunalTypeAddComponent;
  let fixture: ComponentFixture<TribunalTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TribunalTypeAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TribunalTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
