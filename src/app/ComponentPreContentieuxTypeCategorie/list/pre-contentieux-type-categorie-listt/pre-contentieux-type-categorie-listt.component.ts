import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PreContentieuxTypeCategorieService } from '../../../Services/pre-contentieux-type-categorie.service';
import { PreContentieuxTypeCategorie } from '../../../../Models/PreContentieuxTypeCategorie';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-pre-contentieux-type-categorie-listt',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 

  templateUrl: './pre-contentieux-type-categorie-listt.component.html',
  styleUrl: './pre-contentieux-type-categorie-listt.component.scss'
})
export class PreContentieuxTypeCategorieListtComponent {
  preContentieuxTypeCategories: PreContentieuxTypeCategorie[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private preContentieuxTypeCategorieService: PreContentieuxTypeCategorieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadPreContentieuxTypeCategories();
  }

  loadPreContentieuxTypeCategories(): void {
    this.preContentieuxTypeCategorieService.getPreContentieuxTypeCategories().subscribe(
      (data) => {
        this.preContentieuxTypeCategories = data;
      },
      (error) => {
        console.error('Error loading pre-contentieux type categories', error);
        this.errorMessage = 'Error loading pre-contentieux type categories';
      }
    );
  }

  deletePreContentieuxTypeCategorie(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { 
      if (result) {
        this.preContentieuxTypeCategorieService.deletePreContentieuxTypeCategorie(id).subscribe(
          () => {
            this.snackBar.open('Catégorie pré-contentieux supprimée avec succès', 'Fermer', {
              duration: 3000, 
            });
            this.loadPreContentieuxTypeCategories(); 
          },
          (error) => {
            console.error('Erreur lors de la suppression de la catégorie pré-contentieux', error);
            this.errorMessage = 'Erreur lors de la suppression de la catégorie pré-contentieux';
            this.snackBar.open('Erreur lors de la suppression de la catégorie pré-contentieux', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchPreContentieuxTypeCategories(): void {
    if (this.searchQuery.trim() !== '') {
      this.preContentieuxTypeCategories = this.preContentieuxTypeCategories.filter((category) =>
        category.preContentieuxTypeCategorieLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadPreContentieuxTypeCategories();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
