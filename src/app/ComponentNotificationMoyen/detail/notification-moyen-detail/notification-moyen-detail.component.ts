import { Component, OnInit } from '@angular/core';
import { NotificationMoyen } from '../../../../Models/NotificationMoyen';
import { NotificationMoyenServiceService } from '../../../Services/notification-moyen-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-moyen-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './notification-moyen-detail.component.html',
  styleUrl: './notification-moyen-detail.component.scss'
})
export class NotificationMoyenDetailComponent {
  notificationMoyen: NotificationMoyen | undefined;

  constructor(
    private notificationMoyenService: NotificationMoyenServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getNotificationMoyen();
  }

  getNotificationMoyen(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.notificationMoyenService.getNotificationMoyenById(id).subscribe(
      (data: NotificationMoyen) => {
        this.notificationMoyen = data;
      },
      (error: any) => {
        console.error('Error fetching NotificationMoyen :', error);
      }
    );
  }
 }