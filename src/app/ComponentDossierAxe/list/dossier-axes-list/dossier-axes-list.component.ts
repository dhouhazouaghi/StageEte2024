import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { DossierAxeService } from '../../../Services/dossier-axe.service';
import { DossierAxe } from '../../../../Models/DossierAxe';

@Component({
  selector: 'app-dossier-axes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule , FormsModule, MatSnackBarModule, MatDialogModule],

  templateUrl: './dossier-axes-list.component.html',
  styleUrl: './dossier-axes-list.component.scss'
})
export class DossierAxesListComponent {
  dossierAxes: DossierAxe[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private dossierAxeService: DossierAxeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDossierAxes();
  }

  loadDossierAxes(): void {
    this.dossierAxeService.getAllDossierAxes().subscribe(
      (data) => this.dossierAxes = data,
      (error) => {
        console.error('Error loading dossier axes', error);
        this.errorMessage = 'Error loading dossier axes';
      }
    );
  }

  deleteDossierAxe(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dossierAxeService.deleteDossierAxe(id).subscribe(
          () => {
            this.snackBar.open('Dossier Axe supprimé avec succès', 'Fermer', { duration: 3000 });
            this.loadDossierAxes();
          },
          (error) => {
            console.error('Error deleting dossier axe', error);
            this.errorMessage = 'Erreur lors de la suppression du dossier axe';
            this.snackBar.open('Erreur lors de la suppression du dossier axe', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }

  searchDossierAxes(): void {
    if (this.searchQuery.trim()) {
      this.dossierAxes = this.dossierAxes.filter((axe) =>
        axe.dossierAxeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadDossierAxes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit ? description : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
