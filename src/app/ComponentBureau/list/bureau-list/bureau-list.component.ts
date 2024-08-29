import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Bureau } from '../../../../Models/Bureau';
import { BureauService } from '../../../Services/bureau.service';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-bureau-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 
  templateUrl: './bureau-list.component.html',
  styleUrl: './bureau-list.component.scss'
})
export class BureauListComponent {
  bureaux: Bureau[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private bureauService: BureauService, // Update service
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBureaux();
  }

  loadBureaux(): void {
    this.bureauService.getBureaux().subscribe(
      (data) => {
        this.bureaux = data;
      },
      (error) => {
        console.error('Error loading bureaux', error);
        this.errorMessage = 'Error loading bureaux';
      }
    );
  }

  deleteBureau(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.bureauService.deleteBureau(id).subscribe(
          () => {
            this.snackBar.open('Bureau supprimé avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadBureaux(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du bureau', error);
            this.errorMessage = 'Erreur lors de la suppression du bureau';
            this.snackBar.open('Erreur lors de la suppression du bureau', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchBureaux(): void {
    if (this.searchQuery.trim() !== '') {
      this.bureaux = this.bureaux.filter((bureau) =>
        bureau.bureauRaisonSocial.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadBureaux();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
