import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { ExpertCompetenceService } from '../../../Services/expert-competence.service';
import { ExpertCompetence } from '../../../../Models/ExpertCompetence';

@Component({
  selector: 'app-expert-competence-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule, MatSnackBarModule, MatDialogModule],

  templateUrl: './expert-competence-list.component.html',
  styleUrl: './expert-competence-list.component.scss'
})
export class ExpertCompetenceListComponent implements OnInit {
  expertCompetences: ExpertCompetence[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private expertCompetenceService: ExpertCompetenceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadExpertCompetences();
  }

  loadExpertCompetences(): void {
    this.expertCompetenceService.getExpertCompetences().subscribe(
      (data) => {
        this.expertCompetences = data;
      },
      (error) => {
        console.error('Error loading expert competences', error);
        this.errorMessage = 'Error loading expert competences';
      }
    );
  }

  deleteExpertCompetence(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this expert competence?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.expertCompetenceService.deleteExpertCompetence(id).subscribe(
          () => {
            this.snackBar.open('Expert competence deleted successfully', 'Close', {
              duration: 3000,
            });
            this.loadExpertCompetences(); // Reload the list after deletion
          },
          (error) => {
            console.error('Error deleting expert competence', error);
            this.errorMessage = 'Error deleting expert competence';
            this.snackBar.open('Error deleting expert competence', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchExpertCompetences(): void {
    if (this.searchQuery.trim() !== '') {
      this.expertCompetences = this.expertCompetences.filter((competence) =>
        competence.expertCompetenceLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadExpertCompetences();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}