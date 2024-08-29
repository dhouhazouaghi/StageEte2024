import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TribunalTypeService } from '../../../Services/tribunal-type.service';
import { TribunalType } from '../../../../Models/Tribunal';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-tribunal-type-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 

  templateUrl: './tribunal-type-list.component.html',
  styleUrl: './tribunal-type-list.component.scss'
})
export class TribunalTypeListComponent {
  tribunalTypes: TribunalType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private tribunalTypeService: TribunalTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadTribunalTypes();
  }

  loadTribunalTypes(): void {
    this.tribunalTypeService.getTribunalTypes().subscribe(
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
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { 
      if (result) {
        this.tribunalTypeService.deleteTribunalType(id).subscribe(
          () => {
            this.snackBar.open('Type de tribunal supprimé avec succès', 'Fermer', {
              duration: 3000, 
            });
            this.loadTribunalTypes(); 
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
        type.tribunalTypeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
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
