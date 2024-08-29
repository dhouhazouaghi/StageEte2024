import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PreContentieuxTypeService } from '../../../Services/pre-contentieux-type.service';
import { PreContentieuxType } from '../../../../Models/PreContentieuxType';

@Component({
  selector: 'app-update-pre-contentieux-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './update-pre-contentieux-type.component.html',
  styleUrl: './update-pre-contentieux-type.component.scss'
})
export class UpdatePreContentieuxTypeComponent implements OnInit {
  preContentieuxTypeForm: FormGroup;
  errorMessage: string = '';
  preContentieuxTypeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private preContentieuxTypeService: PreContentieuxTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.preContentieuxTypeForm = this.fb.group({
      preContentieuxTypeCategorieRef: ['', Validators.required],
      preContentieuxTypeLibelle: ['', Validators.required],
      preContentieuxTypeLibelleArabe: ['', Validators.required],
      preContentieuxTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      preContentieuxTypeDelai: ['', Validators.required],
      preContentieuxTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.preContentieuxTypeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.preContentieuxTypeId) {
      this.preContentieuxTypeService.getPreContentieuxTypeById(this.preContentieuxTypeId).subscribe(
        (preContentieuxType: PreContentieuxType) => {
          this.preContentieuxTypeForm.patchValue(preContentieuxType);
        },
        error => {
          console.error('Erreur lors de la récupération du type de pré-contentieux', error);
          this.errorMessage = 'Erreur lors de la récupération du type de pré-contentieux';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.preContentieuxTypeForm.patchValue({ preContentieuxTypeEtat: target.checked ? 1 : 0 });
  }

  updatePreContentieuxType(): void {
    if (this.preContentieuxTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.preContentieuxTypeId !== null) {
      const preContentieuxType: PreContentieuxType = { id: this.preContentieuxTypeId, ...this.preContentieuxTypeForm.value };
      this.preContentieuxTypeService.updatePreContentieuxType(this.preContentieuxTypeId, preContentieuxType).subscribe(
        response => {
          console.log('PreContentieuxType mis à jour avec succès', response);
          this.snackBar.open('Type de pré-contentieux mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/PreContentieuxTypeList']);  
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du PreContentieuxType', error);
          this.errorMessage = 'Erreur lors de la mise à jour du PreContentieuxType';
          this.snackBar.open('Erreur lors de la mise à jour du type de pré-contentieux', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/PreContentieuxTypeList']);
  }
}
