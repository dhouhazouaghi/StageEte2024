import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierCategorieServiceService } from '../../../Services/dossier-categorie-service.service';
import { Router } from '@angular/router';
import { DossierCategorie } from '../../../../Models/DossierCategorie';

@Component({
  selector: 'app-add-doss-categ',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './add-doss-categ.component.html',
  styleUrl: './add-doss-categ.component.scss'
})
export class AddDossCategComponent {
  dossierCategorieForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dossierCategorieService: DossierCategorieServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.dossierCategorieForm = this.fb.group({
      dossierAxeRef: [null, Validators.required],
      dossierCategorieLibelle: ['', Validators.required],
      dossierCategorieLibelleArabe: ['', Validators.required],
      dossierCategorieDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierCategorieDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierCategorieEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierCategorieForm.patchValue({ dossierCategorieEtat: target.checked ? 1 : 0 });
  }

  addDossierCategorie(): void {
    if (this.dossierCategorieForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
  
     this.dossierCategorieService.getDossierCategories().subscribe(
      (dossierCategories: DossierCategorie[]) => {
        const maxId = dossierCategories.reduce((max, d) => d.id > max ? d.id : max, 0);
        const newId = maxId + 1;

         const dossierCategorie: DossierCategorie = { id: newId, ...this.dossierCategorieForm.value };
        this.dossierCategorieService.addDossierCategorie(dossierCategorie).subscribe(
          response => {
            console.log('DossierCategorie ajouté avec succès', response);
            this.snackBar.open('Catégorie de dossier ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/dossier-categories']);   
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du DossierCategorie', error);
            this.errorMessage = 'Erreur lors de l\'ajout du DossierCategorie';
            this.snackBar.open('Erreur lors de l\'ajout de la catégorie de dossier', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des catégories de dossier', error);
        this.errorMessage = 'Erreur lors de la récupération des catégories de dossier';
        this.snackBar.open('Erreur lors de la récupération des catégories de dossier', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  
  onCancel() {
    this.router.navigate(['/dossier-categories']); 
  }
}
