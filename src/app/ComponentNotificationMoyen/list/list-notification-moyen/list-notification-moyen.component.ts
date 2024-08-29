import { Component, OnInit } from '@angular/core';
import { NotificationMoyen } from '../../../../Models/NotificationMoyen';
import { NotificationMoyenServiceService } from '../../../Services/notification-moyen-service.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-notification-moyen',
  standalone: true,
  imports: [FormsModule, RouterModule, NgxPaginationModule, CommonModule],
  templateUrl: './list-notification-moyen.component.html',
  styleUrl: './list-notification-moyen.component.scss'
})
export class ListNotificationMoyenComponent implements OnInit {
  notificationMoyens: NotificationMoyen[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(private notificationMoyenService: NotificationMoyenServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNotificationMoyens();
  }

  loadNotificationMoyens(): void {
    this.notificationMoyenService.getNotificationMoyens().subscribe(
      (data: NotificationMoyen[]) => {
        this.notificationMoyens = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des moyens de notification', error);
        this.errorMessage = 'Erreur lors du chargement des moyens de notification';
      }
    );
  }

  deleteNotificationMoyen(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { // Annotate the result parameter with a boolean type
      if (result) {
        this.notificationMoyenService.deleteNotificationMoyen(id).subscribe(
          () => {
            this.snackBar.open('Type de tribunal supprimé avec succès', 'Fermer', {
              duration: 3000,  // Duration in milliseconds
            });
            this.loadNotificationMoyens(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du tribunal', error);
            this.errorMessage = 'Erreur lors de la suppression du tribunal';
            this.snackBar.open('Erreur lors de la suppression du tribunal', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchNotificationMoyens(): void {
    if (this.searchQuery.trim() !== '') {
      this.notificationMoyens = this.notificationMoyens.filter((moyen) =>
        moyen.notificationMoyenLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadNotificationMoyens();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }

 
}
