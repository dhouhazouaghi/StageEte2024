import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAvocatSpecialiteComponent } from './list-avocat-specialite.component';

describe('ListAvocatSpecialiteComponent', () => {
  let component: ListAvocatSpecialiteComponent;
  let fixture: ComponentFixture<ListAvocatSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAvocatSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAvocatSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
