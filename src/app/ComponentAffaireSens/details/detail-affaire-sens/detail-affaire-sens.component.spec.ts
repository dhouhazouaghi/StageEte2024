import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAffaireSensComponent } from './detail-affaire-sens.component';

describe('DetailAffaireSensComponent', () => {
  let component: DetailAffaireSensComponent;
  let fixture: ComponentFixture<DetailAffaireSensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAffaireSensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAffaireSensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
