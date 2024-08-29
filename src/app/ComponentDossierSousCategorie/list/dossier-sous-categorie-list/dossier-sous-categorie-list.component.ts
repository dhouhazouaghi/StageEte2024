import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { DossierSousCategorieService } from '../../../Services/dossier-sous-categorie.service';
import { DossierSousCategorie } from '../../../../Models/DossierSousCategorie';

@Component({
  selector: 'app-dossier-sous-categorie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule],

  templateUrl: './dossier-sous-categorie-list.component.html',
  styleUrl: './dossier-sous-categorie-list.component.scss'
})
export class DossierSousCategorieListComponent {
  dossierSousCategories: DossierSousCategorie[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private dossierSousCategorieService: DossierSousCategorieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadDossierSousCategories();
  }

  loadDossierSousCategories(): void {
    this.dossierSousCategorieService.getDossierSousCategories().subscribe(
      (data) => {
        this.dossierSousCategories = data;
      },
      (error) => {
        console.error('Error loading dossier sous-categories', error);
        this.errorMessage = 'Error loading dossier sous-categories';
      }
    );
  }

  deleteDossierSousCategorie(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dossierSousCategorieService.deleteDossierSousCategorie(id).subscribe(
          () => {
            this.snackBar.open('Sous-catégorie supprimée avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadDossierSousCategories();
          },
          (error) => {
            console.error('Erreur lors de la suppression de la sous-catégorie', error);
            this.errorMessage = 'Erreur lors de la suppression de la sous-catégorie';
            this.snackBar.open('Erreur lors de la suppression de la sous-catégorie', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchDossierSousCategories(): void {
    if (this.searchQuery.trim() !== '') {
      this.dossierSousCategories = this.dossierSousCategories.filter((sousCategorie) =>
        sousCategorie.dossierSousCategorieLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadDossierSousCategories();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
