import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunalTypeListComponentComponent } from './tribunal-type-list-component.component';

describe('TribunalTypeListComponentComponent', () => {
  let component: TribunalTypeListComponentComponent;
  let fixture: ComponentFixture<TribunalTypeListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TribunalTypeListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TribunalTypeListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
