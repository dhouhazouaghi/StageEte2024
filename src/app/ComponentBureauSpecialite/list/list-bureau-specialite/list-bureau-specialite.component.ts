import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BureauSpecialite } from '../../../../Models/BureauSpecialite';
import { BureauSpecialiteService } from '../../../Services/bureau-specialite.service';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-list-bureau-specialite',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule], 

  templateUrl: './list-bureau-specialite.component.html',
  styleUrl: './list-bureau-specialite.component.scss'
})
export class ListBureauSpecialiteComponent {
  bureauSpecialites: BureauSpecialite[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private bureauSpecialiteService: BureauSpecialiteService,   
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBureauSpecialites();  
  }

  loadBureauSpecialites(): void {   
    this.bureauSpecialiteService.getBureauSpecialites().subscribe(   
      (data) => {
        this.bureauSpecialites = data;
      },
      (error) => {
        console.error('Error loading bureau specialites', error);
        this.errorMessage = 'Error loading bureau specialites';
      }
    );
  }

  deleteBureauSpecialite(id: number): void {  
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.bureauSpecialiteService.deleteBureauSpecialite(id).subscribe(   
          () => {
            this.snackBar.open('Spécialité de bureau supprimée avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadBureauSpecialites();  
          },
          (error) => {
            console.error('Erreur lors de la suppression de la spécialité de bureau', error);
            this.errorMessage = 'Erreur lors de la suppression de la spécialité de bureau';
            this.snackBar.open('Erreur lors de la suppression de la spécialité de bureau', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchBureauSpecialites(): void {   
    if (this.searchQuery.trim() !== '') {
      this.bureauSpecialites = this.bureauSpecialites.filter((specialite) =>
        specialite.bureauSpecialiteLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadBureauSpecialites();  
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}
