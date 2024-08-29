import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { BureauTypeService } from '../../../Services/bureau-type.service';
import { BureauType } from '../../../../Models/BureauType';

@Component({
  selector: 'app-bureau-type-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 
  templateUrl: './bureau-type-list.component.html',
  styleUrl: './bureau-type-list.component.scss'
})
export class BureauTypeListComponent {
  bureauTypes: BureauType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private bureauTypeService: BureauTypeService, // Adjusted service injection
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog correctly
  ) {}

  ngOnInit(): void {
    this.loadBureauTypes();
  }

  loadBureauTypes(): void {
    this.bureauTypeService.getBureauTypes().subscribe(
      (data) => {
        this.bureauTypes = data;
      },
      (error) => {
        console.error('Error loading bureau types', error);
        this.errorMessage = 'Error loading bureau types';
      }
    );
  }

  deleteBureauType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { // Annotate the result parameter with a boolean type
      if (result) {
        this.bureauTypeService.deleteBureauType(id).subscribe(
          () => {
            this.snackBar.open('Type de bureau supprimé avec succès', 'Fermer', {
              duration: 3000,  // Duration in milliseconds
            });
            this.loadBureauTypes(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du bureau', error);
            this.errorMessage = 'Erreur lors de la suppression du bureau';
            this.snackBar.open('Erreur lors de la suppression du bureau', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchBureauTypes(): void {
    if (this.searchQuery.trim() !== '') {
      this.bureauTypes = this.bureauTypes.filter((type) =>
        type.bureauTypeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadBureauTypes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
