import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMoyenDetailComponent } from './notification-moyen-detail.component';

describe('NotificationMoyenDetailComponent', () => {
  let component: NotificationMoyenDetailComponent;
  let fixture: ComponentFixture<NotificationMoyenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationMoyenDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationMoyenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
