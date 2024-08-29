import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotificationMoyenComponent } from './update-notification-moyen.component';

describe('UpdateNotificationMoyenComponent', () => {
  let component: UpdateNotificationMoyenComponent;
  let fixture: ComponentFixture<UpdateNotificationMoyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNotificationMoyenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateNotificationMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
