import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPreContentieuxTypeComponent } from './detail-pre-contentieux-type.component';

describe('DetailPreContentieuxTypeComponent', () => {
  let component: DetailPreContentieuxTypeComponent;
  let fixture: ComponentFixture<DetailPreContentieuxTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPreContentieuxTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPreContentieuxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
