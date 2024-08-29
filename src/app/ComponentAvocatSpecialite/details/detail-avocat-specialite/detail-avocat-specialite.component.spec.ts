import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAvocatSpecialiteComponent } from './detail-avocat-specialite.component';

describe('DetailAvocatSpecialiteComponent', () => {
  let component: DetailAvocatSpecialiteComponent;
  let fixture: ComponentFixture<DetailAvocatSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAvocatSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAvocatSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
