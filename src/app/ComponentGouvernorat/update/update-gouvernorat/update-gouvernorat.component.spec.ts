import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGouvernoratComponent } from './update-gouvernorat.component';

describe('UpdateGouvernoratComponent', () => {
  let component: UpdateGouvernoratComponent;
  let fixture: ComponentFixture<UpdateGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGouvernoratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
