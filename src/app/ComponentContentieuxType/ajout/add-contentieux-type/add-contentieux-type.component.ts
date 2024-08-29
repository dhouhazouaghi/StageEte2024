import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContentieuxTypeService } from '../../../Services/contentieux-type.service';
import { CommonModule } from '@angular/common';
import { ContentieuxType } from '../../../../Models/ContentieuxType';

@Component({
  selector: 'app-add-contentieux-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],

  templateUrl: './add-contentieux-type.component.html',
  styleUrl: './add-contentieux-type.component.scss'
})
export class AddContentieuxTypeComponent {
  contentieuxTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contentieuxTypeService: ContentieuxTypeService, // Adjust service import
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.contentieuxTypeForm = this.fb.group({
      contentieuxTypeLibelle: ['', Validators.required],
      contentieuxTypeLibelleArabe: ['', Validators.required],
      contentieuxTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      contentieuxTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      contentieuxTypeEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.contentieuxTypeForm.patchValue({ contentieuxTypeEtat: target.checked ? 1 : 0 });
  }

  addContentieuxType(): void {
    if (this.contentieuxTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all ContentieuxTypes to determine the max ID
    this.contentieuxTypeService.getAllContentieuxType().subscribe(
      (contentieuxTypes: ContentieuxType[]) => {
        const maxId = contentieuxTypes.reduce((max, c) => c.id > max ? c.id : max, 0);
        const newId = maxId + 1;

        // Create a new ContentieuxType with the new ID
        const contentieuxType: ContentieuxType = { id: newId, ...this.contentieuxTypeForm.value };
        this.contentieuxTypeService.createContentieuxType(contentieuxType).subscribe(
          response => {
            console.log('ContentieuxType ajouté avec succès', response);
            this.snackBar.open('Type de contentieux ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/list']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du ContentieuxType', error);
            this.errorMessage = 'Erreur lors de l\'ajout du ContentieuxType';
            this.snackBar.open('Erreur lors de l\'ajout du type de contentieux', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des types de contentieux', error);
        this.errorMessage = 'Erreur lors de la récupération des types de contentieux';
        this.snackBar.open('Erreur lors de la récupération des types de contentieux', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/list']); 
  }
}
