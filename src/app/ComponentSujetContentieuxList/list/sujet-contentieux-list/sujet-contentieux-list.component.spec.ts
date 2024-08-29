import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetContentieuxListComponent } from './sujet-contentieux-list.component';

describe('SujetContentieuxListComponent', () => {
  let component: SujetContentieuxListComponent;
  let fixture: ComponentFixture<SujetContentieuxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SujetContentieuxListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SujetContentieuxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
