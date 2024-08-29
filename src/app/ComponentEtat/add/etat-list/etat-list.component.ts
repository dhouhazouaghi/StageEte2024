import { Component, OnInit } from '@angular/core';
import { EtatService } from '../../../Services/etat.service';
import { Etat } from '../../../../Models/Etat';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-etat-list',
  standalone: true,
  imports: [FormsModule , RouterModule, NgxPaginationModule, CommonModule],
  templateUrl: './etat-list.component.html',
  styleUrl: './etat-list.component.scss'
})
export class EtatListComponent {
 
  etats: Etat[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private etatService: EtatService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog  
  ) {}

  ngOnInit(): void {
    this.loadEtats();
  }

  loadEtats(): void {
    this.etatService.getEtats().subscribe(
      (data) => {
        this.etats = data;
      },
      (error) => {
        console.error('Error loading etats', error);
        this.errorMessage = 'Error loading etats';
      }
    );
  }

  deleteEtat(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { 
      if (result) {
        this.etatService.deleteEtat(id).subscribe(
          () => {
            this.snackBar.open('État supprimé avec succès', 'Fermer', {
              duration: 3000,  
            });
            this.loadEtats(); 
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'état', error);
            this.errorMessage = 'Erreur lors de la suppression de l\'état';
            this.snackBar.open('Erreur lors de la suppression de l\'état', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchEtats(): void {
    if (this.searchQuery.trim() !== '') {
      this.etats = this.etats.filter((etat) =>
        etat.etatLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadEtats();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }

}