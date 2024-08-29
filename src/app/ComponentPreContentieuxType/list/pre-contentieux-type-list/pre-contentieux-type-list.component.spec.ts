import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreContentieuxTypeListComponent } from './pre-contentieux-type-list.component';

describe('PreContentieuxTypeListComponent', () => {
  let component: PreContentieuxTypeListComponent;
  let fixture: ComponentFixture<PreContentieuxTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreContentieuxTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreContentieuxTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
