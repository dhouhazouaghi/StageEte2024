import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocTypeComponent } from './add-doc-type.component';

describe('AddDocTypeComponent', () => {
  let component: AddDocTypeComponent;
  let fixture: ComponentFixture<AddDocTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDocTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
