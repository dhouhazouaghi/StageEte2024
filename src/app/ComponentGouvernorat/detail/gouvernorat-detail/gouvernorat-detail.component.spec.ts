import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernoratDetailComponent } from './gouvernorat-detail.component';

describe('GouvernoratDetailComponent', () => {
  let component: GouvernoratDetailComponent;
  let fixture: ComponentFixture<GouvernoratDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GouvernoratDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GouvernoratDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
