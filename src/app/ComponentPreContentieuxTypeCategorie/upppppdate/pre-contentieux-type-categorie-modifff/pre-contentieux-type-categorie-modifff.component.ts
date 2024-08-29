import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PreContentieuxTypeCategorieService } from '../../../Services/pre-contentieux-type-categorie.service';
import { PreContentieuxTypeCategorie } from '../../../../Models/PreContentieuxTypeCategorie';

@Component({
  selector: 'app-pre-contentieux-type-categorie-modifff',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './pre-contentieux-type-categorie-modifff.component.html',
  styleUrl: './pre-contentieux-type-categorie-modifff.component.scss'
})
export class PreContentieuxTypeCategorieMODIFFFComponent implements OnInit {
  preContentieuxTypeCategorieForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private preContentieuxTypeCategorieService: PreContentieuxTypeCategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.preContentieuxTypeCategorieForm = this.fb.group({
      preContentieuxTypeCategorieLibelle: ['', Validators.required],
      preContentieuxTypeCategorieLibelleArabe: ['', Validators.required],
      preContentieuxTypeCategorieDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeCategorieDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeCategorieEtat: [0] // Assuming 0 is false and 1 is true
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.preContentieuxTypeCategorieService.getPreContentieuxTypeCategorie(id).subscribe(
      (preContentieuxTypeCategorie: PreContentieuxTypeCategorie) => {
        this.preContentieuxTypeCategorieForm.patchValue(preContentieuxTypeCategorie);
      },
      error => {
        console.error('Erreur lors de la récupération du type de pré-contentieux', error);
        this.errorMessage = 'Erreur lors de la récupération des informations du type de pré-contentieux';
      }
    );
  }

  updatePreContentieuxTypeCategorie(): void {
    if (this.preContentieuxTypeCategorieForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const id = +this.route.snapshot.paramMap.get('id')!;
    const updatedPreContentieuxTypeCategorie: PreContentieuxTypeCategorie = {
      id,
      ...this.preContentieuxTypeCategorieForm.value
    };

    this.preContentieuxTypeCategorieService.updatePreContentieuxTypeCategorie(id, updatedPreContentieuxTypeCategorie).subscribe(
      response => {
        console.log('Type de pré-contentieux mis à jour avec succès', response);
        this.router.navigate(['/pre-contentieux-type-categories']); // Redirect after successful update
      },
      error => {
        console.error('Erreur lors de la mise à jour du type de pré-contentieux', error);
        this.errorMessage = 'Erreur lors de la mise à jour du type de pré-contentieux';
      }
    );
  }
  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.preContentieuxTypeCategorieForm.patchValue({ preContentieuxTypeCategorieEtat: target.checked ? 1 : 0 });
  }
  onCancel() {
    this.router.navigate(['/pre-contentieux-type-categories']);
  }
}