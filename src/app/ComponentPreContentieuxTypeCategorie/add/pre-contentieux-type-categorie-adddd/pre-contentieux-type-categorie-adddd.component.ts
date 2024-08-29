import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PreContentieuxTypeCategorieService } from '../../../Services/pre-contentieux-type-categorie.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreContentieuxTypeCategorie } from '../../../../Models/PreContentieuxTypeCategorie';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pre-contentieux-type-categorie-adddd',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './pre-contentieux-type-categorie-adddd.component.html',
  styleUrl: './pre-contentieux-type-categorie-adddd.component.scss'
})
export class PreContentieuxTypeCategorieADDDDComponent {
  preContentieuxTypeCategorieForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private preContentieuxTypeCategorieService: PreContentieuxTypeCategorieService, // Assurez-vous d'utiliser le service correct
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.preContentieuxTypeCategorieForm = this.fb.group({
      preContentieuxTypeCategorieLibelle: ['', Validators.required],
      preContentieuxTypeCategorieLibelleArabe: ['', Validators.required],
      preContentieuxTypeCategorieLibelleDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeCategorieLibelleDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeCategorieEtat: [0]  
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.preContentieuxTypeCategorieForm.patchValue({ preContentieuxTypeCategorieEtat: target.checked ? 1 : 0 });
  }

  addPreContentieuxTypeCategorie(): void {
    if (this.preContentieuxTypeCategorieForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
  
     this.preContentieuxTypeCategorieService.getPreContentieuxTypeCategories().subscribe(
      (categories: PreContentieuxTypeCategorie[]) => {
        const maxId = categories.reduce((max, c) => c.id > max ? c.id : max, 0);
        const newId = maxId + 1;

         const newCategory: PreContentieuxTypeCategorie = { id: newId, ...this.preContentieuxTypeCategorieForm.value };
        this.preContentieuxTypeCategorieService.createPreContentieuxTypeCategorie(newCategory).subscribe(
          response => {
            console.log('PreContentieuxTypeCategorie ajouté avec succès', response);
            this.snackBar.open('Catégorie pré-contentieuse ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/categorie-pre-contentieux']);   
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de la catégorie pré-contentieuse', error);
            this.errorMessage = 'Erreur lors de l\'ajout de la catégorie pré-contentieuse';
            this.snackBar.open('Erreur lors de l\'ajout de la catégorie pré-contentieuse', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des catégories pré-contentieuses', error);
        this.errorMessage = 'Erreur lors de la récupération des catégories pré-contentieuses';
        this.snackBar.open('Erreur lors de la récupération des catégories pré-contentieuses', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  
  onCancel() {
    this.router.navigate(['/categorie-pre-contentieux']); 
  }
}
