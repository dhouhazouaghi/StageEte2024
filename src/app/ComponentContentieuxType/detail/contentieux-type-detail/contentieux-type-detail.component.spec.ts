import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentieuxTypeDetailComponent } from './contentieux-type-detail.component';

describe('ContentieuxTypeDetailComponent', () => {
  let component: ContentieuxTypeDetailComponent;
  let fixture: ComponentFixture<ContentieuxTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentieuxTypeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentieuxTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
