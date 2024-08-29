import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocTypeComponentComponent } from './update-doc-type-component.component';

describe('UpdateDocTypeComponentComponent', () => {
  let component: UpdateDocTypeComponentComponent;
  let fixture: ComponentFixture<UpdateDocTypeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDocTypeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDocTypeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
