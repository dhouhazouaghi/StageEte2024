import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AffaireSensService } from '../../../Services/affaire-sens.service';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { AffaireSens } from '../../../../Models/AffaireSens';

@Component({
  selector: 'app-affaire-sens-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 

  templateUrl: './affaire-sens-list.component.html',
  styleUrl: './affaire-sens-list.component.scss'
})
export class AffaireSensListComponent {
  affaireSensList: AffaireSens[] = []; 
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private affaireSensService: AffaireSensService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAffaireSens(); 
  }

  loadAffaireSens(): void { 
    this.affaireSensService.getAffaireSens().subscribe(
      (data) => {
        this.affaireSensList = data;
      },
      (error) => {
        console.error('Error loading affaire sens', error);
        this.errorMessage = 'Error loading affaire sens';
      }
    );
  }

  deleteAffaireSens(id: number): void { 
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.affaireSensService.deleteAffaireSens(id).subscribe( 
          () => {
            this.snackBar.open('Affaire Sens supprimée avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadAffaireSens(); 
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'affaire sens', error);
            this.errorMessage = 'Erreur lors de la suppression de l\'affaire sens';
            this.snackBar.open('Erreur lors de la suppression de l\'affaire sens', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchAffaireSens(): void { 
    if (this.searchQuery.trim() !== '') {
      this.affaireSensList = this.affaireSensList.filter((sens) =>
        sens.affaireSensLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadAffaireSens(); 
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
