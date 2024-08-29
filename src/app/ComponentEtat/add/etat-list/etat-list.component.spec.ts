import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatListComponent } from './etat-list.component';

describe('EtatListComponent', () => {
  let component: EtatListComponent;
  let fixture: ComponentFixture<EtatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
