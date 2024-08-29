import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTribunalTypeComponent } from './detail-tribunal-type.component';

describe('DetailTribunalTypeComponent', () => {
  let component: DetailTribunalTypeComponent;
  let fixture: ComponentFixture<DetailTribunalTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTribunalTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailTribunalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
