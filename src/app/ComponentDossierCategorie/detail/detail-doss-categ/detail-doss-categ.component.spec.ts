import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDossCategComponent } from './detail-doss-categ.component';

describe('DetailDossCategComponent', () => {
  let component: DetailDossCategComponent;
  let fixture: ComponentFixture<DetailDossCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDossCategComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailDossCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
