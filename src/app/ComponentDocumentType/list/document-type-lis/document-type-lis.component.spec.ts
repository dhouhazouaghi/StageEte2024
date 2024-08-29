import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeLisComponent } from './document-type-lis.component';

describe('DocumentTypeLisComponent', () => {
  let component: DocumentTypeLisComponent;
  let fixture: ComponentFixture<DocumentTypeLisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTypeLisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentTypeLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
