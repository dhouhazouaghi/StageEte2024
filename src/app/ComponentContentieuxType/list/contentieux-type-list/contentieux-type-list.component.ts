import { Component, OnInit } from '@angular/core';
import { ContentieuxType } from '../../../../Models/ContentieuxType';
import { ContentieuxTypeService } from '../../../Services/contentieux-type.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contentieux-type-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 

  templateUrl: './contentieux-type-list.component.html',
  styleUrl: './contentieux-type-list.component.scss'
})
export class ContentieuxTypeListComponent implements OnInit {
  contentieuxTypes: ContentieuxType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private contentieuxTypeService: ContentieuxTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog correctly
  ) {}

  ngOnInit(): void {
    this.loadContentieuxTypes();
  }

  loadContentieuxTypes(): void {
    this.contentieuxTypeService.getAllContentieuxType().subscribe(
      (data) => {
        this.contentieuxTypes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des types de contentieux', error);
        this.errorMessage = 'Erreur lors du chargement des types de contentieux';
      }
    );
  }

  deleteContentieuxType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { // Annotate the result parameter with a boolean type
      if (result) {
        this.contentieuxTypeService.deleteContentieuxType(id).subscribe(
          () => {
            this.snackBar.open('Type de contentieux supprimé avec succès', 'Fermer', {
              duration: 3000,  // Duration in milliseconds
            });
            this.loadContentieuxTypes(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du type de contentieux', error);
            this.errorMessage = 'Erreur lors de la suppression du type de contentieux';
            this.snackBar.open('Erreur lors de la suppression du type de contentieux', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchContentieuxTypes(): void {
    if (this.searchQuery.trim() !== '') {
      this.contentieuxTypes = this.contentieuxTypes.filter((type) =>
        type.contentieuxTypeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadContentieuxTypes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}