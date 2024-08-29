import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentieuxTypeListComponent } from './contentieux-type-list.component';

describe('ContentieuxTypeListComponent', () => {
  let component: ContentieuxTypeListComponent;
  let fixture: ComponentFixture<ContentieuxTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentieuxTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentieuxTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
