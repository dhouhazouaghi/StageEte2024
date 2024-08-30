import { Component } from '@angular/core';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { DossierPieceJointeService } from '../../../Services/dossier-piece-jointe.service';
import { DossierPieceJointe } from '../../../../Models/DossierPieceJointe';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dossier-piece-jointe-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 
  templateUrl: './dossier-piece-jointe-list.component.html',
  styleUrl: './dossier-piece-jointe-list.component.scss'
})
export class DossierPieceJointeListComponent {
  dossierPieceJointes: DossierPieceJointe[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private dossierPieceJointeService: DossierPieceJointeService,   
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDossierPieceJointes();
  }

  loadDossierPieceJointes(): void {
    this.dossierPieceJointeService.getAllDossierPieceJointes().subscribe(
      (data) => this.dossierPieceJointes = data,
      (error) => {
        console.error('Error loading dossier piece jointes', error);
        this.errorMessage = 'Error loading dossier piece jointes';
      }
    );
  }

  deleteDossierPieceJointe(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dossierPieceJointeService.deleteDossierPieceJointe(id).subscribe(
          () => {
            this.snackBar.open('Dossier pièce jointe supprimée avec succès', 'Fermer', { duration: 3000 });
            this.loadDossierPieceJointes();
          },
          (error) => {
            console.error('Error deleting dossier piece jointe', error);
            this.errorMessage = 'Erreur lors de la suppression de la pièce jointe';
            this.snackBar.open('Erreur lors de la suppression de la pièce jointe', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }

  searchDossierPieceJointes(): void {
    if (this.searchQuery.trim()) {
      this.dossierPieceJointes = this.dossierPieceJointes.filter((pieceJointe) =>
        pieceJointe.dossierPieceJointeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadDossierPieceJointes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit ? description : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
