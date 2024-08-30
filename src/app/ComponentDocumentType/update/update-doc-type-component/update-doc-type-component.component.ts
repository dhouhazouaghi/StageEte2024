import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DocumentTypeService } from '../../../Services/document-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocType } from '../../../../Models/DocType';

@Component({
  selector: 'app-update-doc-type-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],

  templateUrl: './update-doc-type-component.component.html',
  styleUrl: './update-doc-type-component.component.scss'
})
export class UpdateDocTypeComponentComponent implements OnInit {
  docTypeForm: FormGroup;
  errorMessage: string = '';
  docTypeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private docTypeService: DocumentTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.docTypeForm = this.fb.group({
      documentTypeLibelle: ['', Validators.required],
      documentTypeLibelleArabe: ['', Validators.required],
      documentTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      documentTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      documentTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.docTypeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.docTypeId) {
      this.docTypeService.getDocumentTypeById(this.docTypeId).subscribe(
        (docType: DocType) => {
          this.docTypeForm.patchValue(docType);
        },
        error => {
          console.error('Erreur lors de la récupération du type de document', error);
          this.errorMessage = 'Erreur lors de la récupération du type de document';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.docTypeForm.patchValue({ documentTypeEtat: target.checked ? 1 : 0 });
  }

  updateDocType(): void {
    if (this.docTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.docTypeId !== null) {
      const docType: DocType = { id: this.docTypeId, ...this.docTypeForm.value };
      this.docTypeService.updateDocumentType(this.docTypeId, docType).subscribe(
        response => {
          console.log('DocType mis à jour avec succès', response);
          this.snackBar.open('Type de document mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/docTypes']);   
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du DocType', error);
          this.errorMessage = 'Erreur lors de la mise à jour du DocType';
          this.snackBar.open('Erreur lors de la mise à jour du type de document', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/docTypes']);
  }

}
