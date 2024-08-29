import { Component } from '@angular/core';
import { TribunalType } from '../../../../Models/TribunalType';
import { TribunalTypeServicesService } from '../../../NewServices/tribunal-type-services.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponentComponent } from '../../confirm-dialog-component/confirm-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tribunal-type-list-component',
  standalone: true,
  imports: [CommonModule,RouterModule,NgxPaginationModule,FormsModule, MatSnackBarModule],
  templateUrl: './tribunal-type-list-component.component.html',
  styleUrl: './tribunal-type-list-component.component.scss'
})
export class TribunalTypeListComponentComponent {
  tribunalTypes: TribunalType[] = [];
  filteredTribunalTypes: TribunalType[] = [];
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;
  searchLibelle: string = '';

  constructor(
    private tribunalTypeService: TribunalTypeServicesService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog  // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTribunalTypes();
  }

  loadTribunalTypes(): void {
    this.tribunalTypeService.getTribunalTypes().subscribe(
      data => {
        this.tribunalTypes = data;
        this.filteredTribunalTypes = data; 
      },
      error => {
        console.error('Erreur lors du chargement des types de tribunaux', error);
        this.errorMessage = 'Erreur lors du chargement des types de tribunaux';
      }
    );
  }

  deleteTribunalType(tribunalTypeRef: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tribunalTypeService.deleteTribunalType(tribunalTypeRef).subscribe(
          response => {
            console.log(response);
            this.snackBar.open('Type de tribunal supprimé avec succès', 'Fermer', {
              duration: 3000,  // Durée en millisecondes
            });
            this.loadTribunalTypes(); // Recharger la liste après suppression
          },
          error => {
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
  

  getTribunalById(tribunalTypeRef: number): void {
    this.tribunalTypeService.getTribunalTypeById(tribunalTypeRef).subscribe(
      tribunal => {
        console.log('Détails du tribunal type:', tribunal);
        this.router.navigate(['/tribunal-types', tribunal.tribunalTypeRef]);
      },
      error => {
        console.error('Erreur lors de la récupération des détails du tribunal type', error);
        this.errorMessage = 'Erreur lors de la récupération des détails du tribunal type';
      }
    );
  }

  updateTribunalType(tribunalTypeRef: number): void {
    this.router.navigate(['/update-tribunal', tribunalTypeRef]);
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    } else {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
  }

  onSearch(): void {
    this.filteredTribunalTypes = this.tribunalTypes.filter(tribunal =>
      tribunal.tribunalTypeLibelle.toLowerCase().includes(this.searchLibelle.toLowerCase())
    );
  }
}
