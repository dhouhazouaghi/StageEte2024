import { Component, OnInit } from '@angular/core';
import { Gouvernorat } from '../../../../Models/Gouvernorat';
import { GouvernoratService } from '../../../Services/gouvernorat.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gouvernorat-list',
  standalone: true,
  imports: [FormsModule , RouterModule, NgxPaginationModule, CommonModule,MatSnackBarModule],
  templateUrl: './gouvernorat-list.component.html',
  styleUrl: './gouvernorat-list.component.scss'
})
export class GouvernoratListComponent implements OnInit {
 
  gouvernorats: Gouvernorat[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private gouvernoratService: GouvernoratService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGouvernorats();
  }

  loadGouvernorats(): void {
    this.gouvernoratService.getGouvernorats().subscribe(
      (data: Gouvernorat[]) => {
        this.gouvernorats = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des gouvernorats', error);
        this.errorMessage = 'Erreur lors du chargement des gouvernorats';
      }
    );
  }

  deleteGouvernorat(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce gouvernorat?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gouvernoratService.deleteGouvernorat(id).subscribe(
          () => {
            this.snackBar.open('Gouvernorat supprimé avec succès', 'Fermer', {
              duration: 3000
            });
            this.loadGouvernorats(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du gouvernorat', error);
            this.errorMessage = 'Erreur lors de la suppression du gouvernorat';
            this.snackBar.open('Erreur lors de la suppression du gouvernorat', 'Fermer', {
              duration: 3000
            });
          }
        );
      }
    });
  }

  searchGouvernorats(): void {
    if (this.searchQuery.trim() !== '') {
      this.gouvernorats = this.gouvernorats.filter((type) =>
        type.gouvernoratLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadGouvernorats();
    }
  }

}