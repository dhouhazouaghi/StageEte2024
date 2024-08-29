import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotificationMoyenComponent } from './add-notification-moyen.component';

describe('AddNotificationMoyenComponent', () => {
  let component: AddNotificationMoyenComponent;
  let fixture: ComponentFixture<AddNotificationMoyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNotificationMoyenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNotificationMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
