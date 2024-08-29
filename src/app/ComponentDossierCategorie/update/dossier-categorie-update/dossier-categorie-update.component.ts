import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierCategorieServiceService } from '../../../Services/dossier-categorie-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierCategorie } from '../../../../Models/DossierCategorie';

@Component({
  selector: 'app-dossier-categorie-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './dossier-categorie-update.component.html',
  styleUrl: './dossier-categorie-update.component.scss'
})
export class DossierCategorieUpdateComponent implements OnInit {
  dossierCategorieForm: FormGroup;
  errorMessage: string = '';
  dossierCategorieId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dossierCategorieService: DossierCategorieServiceService, // Adjust service import as necessary
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.dossierCategorieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.dossierCategorieId) {
      this.dossierCategorieService.getDossierCategorieById(this.dossierCategorieId).subscribe(
        (dossierCategorie: DossierCategorie) => {
          this.dossierCategorieForm.patchValue(dossierCategorie);
        },
        error => {
          console.error('Erreur lors de la récupération de la catégorie de dossier', error);
          this.errorMessage = 'Erreur lors de la récupération de la catégorie de dossier';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierCategorieForm.patchValue({ dossierCategorieEtat: target.checked ? 1 : 0 });
  }

  updateDossierCategorie(): void {
    if (this.dossierCategorieForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.dossierCategorieId !== null) {
      const dossierCategorie: DossierCategorie = { id: this.dossierCategorieId, ...this.dossierCategorieForm.value };
      this.dossierCategorieService.updateDossierCategorie(this.dossierCategorieId, dossierCategorie).subscribe(
        response => {
          console.log('DossierCategorie mis à jour avec succès', response);
          this.snackBar.open('Catégorie de dossier mise à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/dossier-categories']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de la catégorie de dossier', error);
          this.errorMessage = 'Erreur lors de la mise à jour de la catégorie de dossier';
          this.snackBar.open('Erreur lors de la mise à jour de la catégorie de dossier', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/dossier-categories']);
  }
}