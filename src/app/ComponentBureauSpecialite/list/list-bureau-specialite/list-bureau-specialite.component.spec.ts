import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBureauSpecialiteComponent } from './list-bureau-specialite.component';

describe('ListBureauSpecialiteComponent', () => {
  let component: ListBureauSpecialiteComponent;
  let fixture: ComponentFixture<ListBureauSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBureauSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBureauSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
