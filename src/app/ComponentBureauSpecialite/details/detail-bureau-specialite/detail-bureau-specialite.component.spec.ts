import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBureauSpecialiteComponent } from './detail-bureau-specialite.component';

describe('DetailBureauSpecialiteComponent', () => {
  let component: DetailBureauSpecialiteComponent;
  let fixture: ComponentFixture<DetailBureauSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBureauSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBureauSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
