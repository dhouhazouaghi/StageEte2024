import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProComponent } from './list-pro.component';

describe('ListProComponent', () => {
  let component: ListProComponent;
  let fixture: ComponentFixture<ListProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
