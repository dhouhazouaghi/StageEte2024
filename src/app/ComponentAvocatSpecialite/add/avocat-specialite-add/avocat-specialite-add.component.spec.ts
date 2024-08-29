import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatSpecialiteAddComponent } from './avocat-specialite-add.component';

describe('AvocatSpecialiteAddComponent', () => {
  let component: AvocatSpecialiteAddComponent;
  let fixture: ComponentFixture<AvocatSpecialiteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvocatSpecialiteAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvocatSpecialiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
