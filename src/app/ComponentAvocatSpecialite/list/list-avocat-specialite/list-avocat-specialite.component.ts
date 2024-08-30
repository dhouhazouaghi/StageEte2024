import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AvocatSpecialite } from '../../../../Models/AvocatSpecialite';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { AvocatSpecialiteService } from '../../../Services/avocat-specialite.service';

@Component({
  selector: 'app-list-avocat-specialite',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 

  templateUrl: './list-avocat-specialite.component.html',
  styleUrl: './list-avocat-specialite.component.scss'
})
export class ListAvocatSpecialiteComponent {
  avocatSpecialites: AvocatSpecialite[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private avocatSpecialiteService: AvocatSpecialiteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAvocatSpecialites(); 
  }

  loadAvocatSpecialites(): void { 
    this.avocatSpecialiteService.getAvocatSpecialites().subscribe( 
      (data) => {
        this.avocatSpecialites = data;
      },
      (error) => {
        console.error('Error loading avocat specialites', error);
        this.errorMessage = 'Error loading avocat specialites';
      }
    );
  }

  deleteAvocatSpecialite(id: number): void { 
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.avocatSpecialiteService.deleteAvocatSpecialite(id).subscribe( 
          () => {
            this.snackBar.open('Spécialité d\'avocat supprimée avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadAvocatSpecialites(); 
          },
          (error) => {
            console.error('Erreur lors de la suppression de la spécialité d\'avocat', error);
            this.errorMessage = 'Erreur lors de la suppression de la spécialité d\'avocat';
            this.snackBar.open('Erreur lors de la suppression de la spécialité d\'avocat', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchAvocatSpecialites(): void { 
    if (this.searchQuery.trim() !== '') {
      this.avocatSpecialites = this.avocatSpecialites.filter((specialite) =>
        specialite.avocatSpecialiteLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadAvocatSpecialites(); 
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
