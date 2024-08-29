import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PreContentieuxType } from '../../../../Models/PreContentieuxType';
import { PreContentieuxTypeService } from '../../../Services/pre-contentieux-type.service';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-pre-contentieux-type-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 
  templateUrl: './pre-contentieux-type-list.component.html',
  styleUrl: './pre-contentieux-type-list.component.scss'
})
export class PreContentieuxTypeListComponent {
  preContentieuxTypes: PreContentieuxType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private preContentieuxTypeService: PreContentieuxTypeService, // Update with the correct service
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog correctly
  ) {}

  ngOnInit(): void {
    this.loadPreContentieuxTypes();
  }

  loadPreContentieuxTypes(): void {
    this.preContentieuxTypeService.getPreContentieuxTypes().subscribe(
      (data) => {
        this.preContentieuxTypes = data;
      },
      (error) => {
        console.error('Error loading pre-contentieux types', error);
        this.errorMessage = 'Error loading pre-contentieux types';
      }
    );
  }

  deletePreContentieuxType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { // Annotate the result parameter with a boolean type
      if (result) {
        this.preContentieuxTypeService.deletePreContentieuxType(id).subscribe(
          () => {
            this.snackBar.open('Type de pré-contentieux supprimé avec succès', 'Fermer', {
              duration: 3000,  // Duration in milliseconds
            });
            this.loadPreContentieuxTypes(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du pré-contentieux', error);
            this.errorMessage = 'Erreur lors de la suppression du pré-contentieux';
            this.snackBar.open('Erreur lors de la suppression du pré-contentieux', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchPreContentieuxTypes(): void {
    if (this.searchQuery.trim() !== '') {
      this.preContentieuxTypes = this.preContentieuxTypes.filter((type) =>
        type.preContentieuxTypeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadPreContentieuxTypes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
