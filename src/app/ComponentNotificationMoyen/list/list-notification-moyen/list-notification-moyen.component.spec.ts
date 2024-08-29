import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotificationMoyenComponent } from './list-notification-moyen.component';

describe('ListNotificationMoyenComponent', () => {
  let component: ListNotificationMoyenComponent;
  let fixture: ComponentFixture<ListNotificationMoyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNotificationMoyenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListNotificationMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
