import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGouvernoratComponent } from './add-gouvernorat.component';

describe('AddGouvernoratComponent', () => {
  let component: AddGouvernoratComponent;
  let fixture: ComponentFixture<AddGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGouvernoratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
