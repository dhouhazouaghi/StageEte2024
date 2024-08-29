import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireSensListComponent } from './affaire-sens-list.component';

describe('AffaireSensListComponent', () => {
  let component: AffaireSensListComponent;
  let fixture: ComponentFixture<AffaireSensListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffaireSensListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffaireSensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
