import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreContentieuxTypeAddComponent } from './pre-contentieux-type-add.component';

describe('PreContentieuxTypeAddComponent', () => {
  let component: PreContentieuxTypeAddComponent;
  let fixture: ComponentFixture<PreContentieuxTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreContentieuxTypeAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreContentieuxTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
