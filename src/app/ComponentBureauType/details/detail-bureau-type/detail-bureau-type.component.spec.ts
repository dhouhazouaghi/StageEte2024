import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBureauTypeComponent } from './detail-bureau-type.component';

describe('DetailBureauTypeComponent', () => {
  let component: DetailBureauTypeComponent;
  let fixture: ComponentFixture<DetailBureauTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBureauTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBureauTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
