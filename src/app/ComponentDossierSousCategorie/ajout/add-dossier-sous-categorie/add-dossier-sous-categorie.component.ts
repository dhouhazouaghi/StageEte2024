import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierSousCategorie } from '../../../../Models/DossierSousCategorie';
import { DossierSousCategorieService } from '../../../Services/dossier-sous-categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dossier-sous-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './add-dossier-sous-categorie.component.html',
  styleUrl: './add-dossier-sous-categorie.component.scss'
})
export class AddDossierSousCategorieComponent {
  dossierSousCategorieForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dossierSousCategorieService: DossierSousCategorieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.dossierSousCategorieForm = this.fb.group({
      dossierCategorieRef: [null, Validators.required],
      dossierSousCategorieLibelle: ['', Validators.required],
      dossierSousCategorieLibelleArabe: ['', Validators.required],
      dossierSousCategorieDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierSousCategorieDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierSousCategorieEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierSousCategorieForm.patchValue({ dossierSousCategorieEtat: target.checked ? 1 : 0 });
  }

  addDossierSousCategorie(): void {
    if (this.dossierSousCategorieForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all DossierSousCategories to determine the max ID
    this.dossierSousCategorieService.getDossierSousCategories().subscribe(
      (dossierSousCategories: DossierSousCategorie[]) => {
        const maxId = dossierSousCategories.reduce((max, d) => d.id > max ? d.id : max, 0);
        const newId = maxId + 1;

        // Create a new DossierSousCategorie with the new ID
        const dossierSousCategorie: DossierSousCategorie = { id: newId, ...this.dossierSousCategorieForm.value };
        this.dossierSousCategorieService.addDossierSousCategorie(dossierSousCategorie).subscribe(
          response => {
            console.log('DossierSousCategorie ajouté avec succès', response);
            this.snackBar.open('Sous-catégorie de dossier ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/dossier-sous-categories']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du DossierSousCategorie', error);
            this.errorMessage = 'Erreur lors de l\'ajout du DossierSousCategorie';
            this.snackBar.open('Erreur lors de l\'ajout de la sous-catégorie de dossier', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des sous-catégories de dossier', error);
        this.errorMessage = 'Erreur lors de la récupération des sous-catégories de dossier';
        this.snackBar.open('Erreur lors de la récupération des sous-catégories de dossier', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  
  onCancel() {
    this.router.navigate(['/dossier-sous-categories']); 
  }
}