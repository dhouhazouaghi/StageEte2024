import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from '../../../Services/document-type.service';
import { DocType } from '../../../../Models/DocType';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogComponentComponent } from '../../../Components/confirm-dialog-component/confirm-dialog-component.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-type-lis',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule , FormsModule, MatSnackBarModule, MatDialogModule], 
  templateUrl: './document-type-lis.component.html',
  styleUrl: './document-type-lis.component.scss'
})
export class DocumentTypeLisComponent {
  documentTypes: DocType[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private documentTypeService: DocumentTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog  
  ) {}

  ngOnInit(): void {
    this.loadDocumentTypes();
  }

  loadDocumentTypes(): void {
    this.documentTypeService.getDocumentTypes().subscribe(
      (data) => {
        this.documentTypes = data;
      },
      (error) => {
        console.error('Error loading document types', error);
        this.errorMessage = 'Error loading document types';
      }
    );
  }

  deleteDocumentType(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '250px',
      data: {   }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {  
      if (result) {
        this.documentTypeService.deleteDocumentType(id).subscribe(
          () => {
            this.snackBar.open('Document Type deleted successfully', 'Close', {
              duration: 3000,  // Duration in milliseconds
            });
            this.loadDocumentTypes();  
          },
          (error) => {
            console.error('Error deleting document type', error);
            this.errorMessage = 'Error deleting document type';
            this.snackBar.open('Error deleting document type', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  searchDocumentTypes(): void {
    if (this.searchQuery.trim() !== '') {
      this.documentTypes = this.documentTypes.filter((type) =>
        type.documentTypeLibelle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadDocumentTypes();
    }
  }

  limitDescription(description: string, wordLimit: number = 8): string {
    const words = description.split(' ');
    return words.length <= wordLimit
      ? description
      : `${words.slice(0, wordLimit).join(' ')}...`;
  }
}