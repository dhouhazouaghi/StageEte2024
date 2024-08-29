import { Component } from '@angular/core';
import { Etablissement } from '../../../../Models/Etablissement';
import { EtablissementServiceService } from '../../../Services/etablissement-service.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etablissement-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule , FormsModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './etablissement-list.component.html',
  styleUrl: './etablissement-list.component.scss'
})
export class EtablissementListComponent {
  etablissements: Etablissement[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private etablissementService: EtablissementServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  loadEtablissements(): void {
    this.etablissementService.getEtablissements().subscribe(
      (data) => {
        this.etablissements = data;
      },
      (error) => {
        console.error('Erreur de chargement ', error);
        this.errorMessage = 'Erreur de chargement';
      }
    );
  }

  deleteEtablissement(ref: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.etablissementService.deleteEtablissement(ref).subscribe(
          () => {
            this.snackBar.open('Établissement supprimé avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadEtablissements();
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'établissement', error);
            this.errorMessage = 'Erreur lors de la suppression de l\'établissement';
            this.snackBar.open('Erreur lors de la suppression de l\'établissement', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchEtablissements(): void {
    if (this.searchQuery.trim() !== '') {
      this.etablissements = this.etablissements.filter((etablissement) =>
        etablissement.etablissementLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadEtablissements();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
