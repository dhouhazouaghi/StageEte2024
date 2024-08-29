import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSjtContentieuxComponent } from './detail-sjt-contentieux.component';

describe('DetailSjtContentieuxComponent', () => {
  let component: DetailSjtContentieuxComponent;
  let fixture: ComponentFixture<DetailSjtContentieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSjtContentieuxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailSjtContentieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
