import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentTypeService } from '../../../Services/document-type.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DocType } from '../../../../Models/DocType';

@Component({
  selector: 'app-add-doc-type',
  standalone: true,
  imports: [CommonModule,  FormsModule,ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],  
  templateUrl: './add-doc-type.component.html',
  styleUrl: './add-doc-type.component.scss'
})
export class AddDocTypeComponent  {
  documentTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private documentTypeService: DocumentTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.documentTypeForm = this.fb.group({
      documentTypeLibelle: ['', Validators.required],
      documentTypeLibelleArabe: ['', Validators.required],
      documentTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      documentTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      documentTypeEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.documentTypeForm.patchValue({ documentTypeEtat: target.checked ? 1 : 0 });
  }

  addDocumentType(): void {
    if (this.documentTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.documentTypeService.getDocumentTypes().subscribe(
      (documentTypes: DocType[]) => {
        const maxId = documentTypes.reduce((max, d) => d.id > max ? d.id : max, 0);
        const newId = maxId + 1;

        // Create a new DocumentType with the new ID
        const documentType: DocType = { id: newId, ...this.documentTypeForm.value };
        this.documentTypeService.addDocumentType(documentType).subscribe(
          response => {
            console.log('DocumentType ajouté avec succès', response);
            this.snackBar.open('Type de document ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/docTypes']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du DocumentType', error);
            this.errorMessage = 'Erreur lors de l\'ajout du DocumentType';
            this.snackBar.open('Erreur lors de l\'ajout du type de document', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des types de document', error);
        this.errorMessage = 'Erreur lors de la récupération des types de document';
        this.snackBar.open('Erreur lors de la récupération des types de document', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/docTypes']); 
  }
}