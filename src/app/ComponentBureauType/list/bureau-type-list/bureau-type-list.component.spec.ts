import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauTypeListComponent } from './bureau-type-list.component';

describe('BureauTypeListComponent', () => {
  let component: BureauTypeListComponent;
  let fixture: ComponentFixture<BureauTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BureauTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BureauTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
