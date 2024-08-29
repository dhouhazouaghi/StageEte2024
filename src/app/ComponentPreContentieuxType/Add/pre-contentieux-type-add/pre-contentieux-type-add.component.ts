import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PreContentieuxTypeService } from '../../../Services/pre-contentieux-type.service';
import { Router } from '@angular/router';
import { PreContentieuxType } from '../../../../Models/PreContentieuxType';

@Component({
  selector: 'app-pre-contentieux-type-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './pre-contentieux-type-add.component.html',
  styleUrl: './pre-contentieux-type-add.component.scss'
})
export class PreContentieuxTypeAddComponent {
  preContentieuxTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private preContentieuxTypeService: PreContentieuxTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.preContentieuxTypeForm = this.fb.group({
      preContentieuxTypeCategorieRef: [0, Validators.required],
      preContentieuxTypeLibelle: ['', Validators.required],
      preContentieuxTypeLibelleArabe: ['', Validators.required],
      preContentieuxTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeDelai: [0, Validators.required],
      preContentieuxTypeEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.preContentieuxTypeForm.patchValue({ preContentieuxTypeEtat: target.checked ? 1 : 0 });
  }

  addPreContentieuxType(): void {
    if (this.preContentieuxTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.preContentieuxTypeService.getPreContentieuxTypes().subscribe(
      (preContentieuxTypes: PreContentieuxType[]) => {
        const maxId = preContentieuxTypes.reduce((max, t) => t.id > max ? t.id : max, 0);
        const newId = maxId + 1;

        const preContentieuxType: PreContentieuxType = { id: newId, ...this.preContentieuxTypeForm.value };
        this.preContentieuxTypeService.addPreContentieuxType(preContentieuxType).subscribe(
          response => {
            console.log('PreContentieuxType ajouté avec succès', response);
            this.snackBar.open('Type de précontentieux ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/PreContentieuxTypeList']);  //
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du PreContentieuxType', error);
            this.errorMessage = 'Erreur lors de l\'ajout du PreContentieuxType';
            this.snackBar.open('Erreur lors de l\'ajout du type de précontentieux', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des types de précontentieux', error);
        this.errorMessage = 'Erreur lors de la récupération des types de précontentieux';
        this.snackBar.open('Erreur lors de la récupération des types de précontentieux', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  
  onCancel() {
    this.router.navigate(['/PreContentieuxTypeList']); 
  }
}
