import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernoratListComponent } from './gouvernorat-list.component';

describe('GouvernoratListComponent', () => {
  let component: GouvernoratListComponent;
  let fixture: ComponentFixture<GouvernoratListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GouvernoratListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GouvernoratListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
