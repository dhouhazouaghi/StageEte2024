import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatSpecialiteModifComponent } from './avocat-specialite-modif.component';

describe('AvocatSpecialiteModifComponent', () => {
  let component: AvocatSpecialiteModifComponent;
  let fixture: ComponentFixture<AvocatSpecialiteModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvocatSpecialiteModifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvocatSpecialiteModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
