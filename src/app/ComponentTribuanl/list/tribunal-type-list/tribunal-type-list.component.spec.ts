import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunalTypeListComponent } from './tribunal-type-list.component';

describe('TribunalTypeListComponent', () => {
  let component: TribunalTypeListComponent;
  let fixture: ComponentFixture<TribunalTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TribunalTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TribunalTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
