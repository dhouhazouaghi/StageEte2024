import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfessionnelType } from '../../../../Models/ProfessionnelType';
import { ProfessionnelTypeServiceService } from '../../../Services/professionnel-type-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-list-pro',
  standalone: true,
  imports: [FormsModule, RouterModule, NgxPaginationModule, CommonModule],
  templateUrl: './list-pro.component.html',
  styleUrl: './list-pro.component.scss'
})
export class ListProComponent implements OnInit {
  professionnelTypes: ProfessionnelType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private professionnelTypeService: ProfessionnelTypeServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog correctly
  ) {}

  ngOnInit(): void {
    this.loadTribunalTypes();
  }

  loadTribunalTypes(): void {
    this.professionnelTypeService.getProfessionnelTypes().subscribe(
      (data) => {
        this.professionnelTypes = data;
      },
      (error) => {
        console.error('Error loading professionnel types', error);
        this.errorMessage = 'Error loading professionnel types';
      }
    );
  }

  deleteProfessionnelType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { // Annotate the result parameter with a boolean type
      if (result) {
        this.professionnelTypeService.deleteProfessionnelType(id).subscribe(
          () => {
            this.snackBar.open('Type de proffesionnal supprimé avec succès', 'Fermer', {
              duration: 3000,  // Duration in milliseconds
            });
            this.loadTribunalTypes(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du proffesionnal', error);
            this.errorMessage = 'Erreur lors de la suppression du proffesionnal';
            this.snackBar.open('Erreur lors de la suppression du proffesionnal', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchProfessionnelTypes(): void {
    if (this.searchQuery.trim() !== '') {
      this.professionnelTypes = this.professionnelTypes.filter((type) =>
        type.professionnelTypeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
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



