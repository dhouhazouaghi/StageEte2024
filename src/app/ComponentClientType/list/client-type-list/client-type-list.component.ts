import { Component, OnInit } from '@angular/core';
import { ClientTypeService } from '../../../Services/client-type.service';
import { ClientType } from '../../../../Models/clientType';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-client-type-list',
  standalone: true,
  imports: [FormsModule, RouterModule, NgxPaginationModule, CommonModule],

  templateUrl: './client-type-list.component.html',
  styleUrl: './client-type-list.component.scss'
})
export class ClientTypeListComponent implements OnInit {

    
  clientTypes: ClientType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private clientTypeService: ClientTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClientTypes();
  }

  loadClientTypes(): void {
    this.clientTypeService.getAll().subscribe(
      (data) => {
        this.clientTypes = data;
      },
      (error) => {
        console.error('Error loading client types', error);
        this.errorMessage = 'Error loading client types';
      }
    );
  }

  deleteClientType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { /* Pass any data if needed */ }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientTypeService.delete(id).subscribe(
          () => {
            this.snackBar.open('Type de Client supprimé avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadClientTypes();
          },
          (error) => {
            console.error('Erreur lors de la suppression du Client', error);
            this.errorMessage = 'Erreur lors de la suppression du Client';
            this.snackBar.open('Erreur lors de la suppression du Client', 'Fermer', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchClient(): void {
    if (this.searchQuery.trim() !== '') {
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      this.clientTypes = this.clientTypes.filter((type) =>
        type.clientTypeLibelle.toLowerCase().includes(lowerCaseQuery) ||
        type.clientTypeLibelleArabe.toLowerCase().includes(lowerCaseQuery)
      );
    } else {
      this.loadClientTypes();
    }
  }
    
   }
