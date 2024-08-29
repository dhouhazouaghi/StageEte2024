import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePieceJointeComponent } from './update-piece-jointe.component';

describe('UpdatePieceJointeComponent', () => {
  let component: UpdatePieceJointeComponent;
  let fixture: ComponentFixture<UpdatePieceJointeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePieceJointeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePieceJointeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
