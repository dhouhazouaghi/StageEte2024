import { Component, OnInit } from '@angular/core';
import { JugementTypeService } from '../../../Services/jugement-type.service';
import { JugementType } from '../../../../Models/JugementType';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jugement-type-list',
  standalone: true,
  imports: [FormsModule, RouterModule, NgxPaginationModule, CommonModule],
  templateUrl: './jugement-type-list.component.html',
  styleUrl: './jugement-type-list.component.scss'
})
export class JugementTypeListComponent implements OnInit {
  jugementTypes: JugementType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private jugementTypeService: JugementTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadJugementTypes();
  }

  loadJugementTypes(): void {
    this.jugementTypeService.getAllJugementTypes().subscribe(
      (data) => {
        this.jugementTypes = data;
      },
      (error) => {
        console.error('Error loading jugement types', error);
        this.errorMessage = 'Error loading jugement types';
      }
    );
  }

  deleteJugementType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.jugementTypeService.deleteJugementType(id).subscribe(
          () => {
            this.snackBar.open('Type de jugement supprimé avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadJugementTypes(); // Reload the list after deletion
          },
          (error) => {
            console.error('Erreur lors de la suppression du jugement', error);
            this.errorMessage = 'Erreur lors de la suppression du jugement';
            this.snackBar.open('Erreur lors de la suppression du jugement', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchJugementTypes(): void {
    if (this.searchQuery.trim() !== '') {
      this.jugementTypes = this.jugementTypes.filter((type) =>
        type.jugementTypeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadJugementTypes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}