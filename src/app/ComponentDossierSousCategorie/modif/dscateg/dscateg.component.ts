import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DossierSousCategorieService } from '../../../Services/dossier-sous-categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierSousCategorie } from '../../../../Models/DossierSousCategorie';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dscateg',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './dscateg.component.html',
  styleUrl: './dscateg.component.scss'
})
export class DSCategComponent implements OnInit {
  dossierSousCategorieForm: FormGroup;
  errorMessage: string = '';
  dossierSousCategorieId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dossierSousCategorieService: DossierSousCategorieService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.dossierSousCategorieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.dossierSousCategorieId) {
      this.dossierSousCategorieService.getDossierSousCategorieById(this.dossierSousCategorieId).subscribe(
        (dossierSousCategorie: DossierSousCategorie) => {
          this.dossierSousCategorieForm.patchValue(dossierSousCategorie);
        },
        error => {
          console.error('Erreur lors de la récupération de la sous-catégorie de dossier', error);
          this.errorMessage = 'Erreur lors de la récupération de la sous-catégorie de dossier';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierSousCategorieForm.patchValue({ dossierSousCategorieEtat: target.checked ? 1 : 0 });
  }

  updateDossierSousCategorie(): void {
    if (this.dossierSousCategorieForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.dossierSousCategorieId !== null) {
      const dossierSousCategorie: DossierSousCategorie = { id: this.dossierSousCategorieId, ...this.dossierSousCategorieForm.value };
      this.dossierSousCategorieService.updateDossierSousCategorie(this.dossierSousCategorieId, dossierSousCategorie).subscribe(
        response => {
          console.log('DossierSousCategorie mis à jour avec succès', response);
          this.snackBar.open('Sous-catégorie de dossier mise à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/dossier-sous-categories']);  
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de la Sous-catégorie de dossier', error);
          this.errorMessage = 'Erreur lors de la mise à jour de la Sous-catégorie de dossier';
          this.snackBar.open('Erreur lors de la mise à jour de la sous-catégorie de dossier', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/dossier-sous-categories']);
  }
}
