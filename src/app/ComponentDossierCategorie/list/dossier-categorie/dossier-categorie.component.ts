import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { DossierCategorieServiceService } from '../../../Services/dossier-categorie-service.service';
import { DossierCategorie } from '../../../../Models/DossierCategorie';

@Component({
  selector: 'app-dossier-categorie',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 
  templateUrl: './dossier-categorie.component.html',
  styleUrl: './dossier-categorie.component.scss'
})
export class DossierCategorieComponent {
  dossierCategories: DossierCategorie[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private dossierCategorieService: DossierCategorieServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadDossierCategories();
  }

  loadDossierCategories(): void {
    this.dossierCategorieService.getDossierCategories().subscribe(
      (data) => {
        this.dossierCategories = data;
      },
      (error) => {
        console.error('Error loading dossier categories', error);
        this.errorMessage = 'Error loading dossier categories';
      }
    );
  }

  deleteDossierCategorie(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { 
      if (result) {
        this.dossierCategorieService.deleteDossierCategorie(id).subscribe(
          () => {
            this.snackBar.open('Catégorie de dossier supprimée avec succès', 'Fermer', {
              duration: 3000, 
            });
            this.loadDossierCategories(); 
          },
          (error) => {
            console.error('Erreur lors de la suppression de la catégorie de dossier', error);
            this.errorMessage = 'Erreur lors de la suppression de la catégorie de dossier';
            this.snackBar.open('Erreur lors de la suppression de la catégorie de dossier', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchDossierCategories(): void {
    if (this.searchQuery.trim() !== '') {
      this.dossierCategories = this.dossierCategories.filter((categorie) =>
        categorie.dossierCategorieLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadDossierCategories();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
