import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExComptComponent } from './detail-ex-compt.component';

describe('DetailExComptComponent', () => {
  let component: DetailExComptComponent;
  let fixture: ComponentFixture<DetailExComptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailExComptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailExComptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
