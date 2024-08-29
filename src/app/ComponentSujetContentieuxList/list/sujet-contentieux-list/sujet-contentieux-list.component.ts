import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContentieuxSujet } from '../../../../Models/ContentieuxSujet';
import { ContentieuxSujetService } from '../../../Services/contentieux-sujet.service';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-sujet-contentieux-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule , FormsModule, MatSnackBarModule, MatDialogModule],

  templateUrl: './sujet-contentieux-list.component.html',
  styleUrl: './sujet-contentieux-list.component.scss'
})
export class SujetContentieuxListComponent {
  tribunalTypes: ContentieuxSujet[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private tribunalTypeService: ContentieuxSujetService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog correctly
  ) {}

  ngOnInit(): void {
    this.loadTribunalTypes();
  }

  loadTribunalTypes(): void {
    this.tribunalTypeService.getAllContentieuxSujets().subscribe(
      (data) => {
        this.tribunalTypes = data;
      },
      (error) => {
        console.error('Error loading tribunal types', error);
        this.errorMessage = 'Error loading tribunal types';
      }
    );
  }

  deleteTribunalType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { // Annotate the result parameter with a boolean type
      if (result) {
        this.tribunalTypeService.deleteContentieuxSujet(id).subscribe(
          () => {
            this.snackBar.open('Type de tribunal supprimé avec succès', 'Fermer', {
              duration: 3000,  // Duration in milliseconds
            });
            this.loadTribunalTypes(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du tribunal', error);
            this.errorMessage = 'Erreur lors de la suppression du tribunal';
            this.snackBar.open('Erreur lors de la suppression du tribunal', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchTribunalTypes(): void {
    if (this.searchQuery.trim() !== '') {
      this.tribunalTypes = this.tribunalTypes.filter((type) =>
        type.contentieuxSujetLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadTribunalTypes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
  
}
