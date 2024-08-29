import { Component, OnInit } from '@angular/core';
import { TribunalTypeService } from '../../../Services/tribunal-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TribunalType } from '../../../../Models/Tribunal';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-tribunal-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],

  templateUrl: './update-tribunal-type.component.html',
  styleUrl: './update-tribunal-type.component.scss'
})
export class UpdateTribunalTypeComponent implements OnInit {
  tribunalTypeForm: FormGroup;
  errorMessage: string = '';
  tribunalTypeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tribunalTypeService: TribunalTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.tribunalTypeForm = this.fb.group({
      tribunalTypeLibelle: ['', Validators.required],
      tribunalTypeLibelleArabe: ['', Validators.required],
      tribunalTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      tribunalTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      tribunalTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.tribunalTypeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.tribunalTypeId) {
      this.tribunalTypeService.getTribunalTypeById(this.tribunalTypeId).subscribe(
        (tribunalType: TribunalType) => {
          this.tribunalTypeForm.patchValue(tribunalType);
        },
        error => {
          console.error('Erreur lors de la récupération du type de tribunal', error);
          this.errorMessage = 'Erreur lors de la récupération du type de tribunal';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.tribunalTypeForm.patchValue({ tribunalTypeEtat: target.checked ? 1 : 0 });
  }

  updateTribunalType(): void {
    if (this.tribunalTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.tribunalTypeId !== null) {
      const tribunalType: TribunalType = { id: this.tribunalTypeId, ...this.tribunalTypeForm.value };
      this.tribunalTypeService.updateTribunalType(this.tribunalTypeId, tribunalType).subscribe(
        response => {
          console.log('TribunalType mis à jour avec succès', response);
          this.snackBar.open('Type de tribunal mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/tribunal-types']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du TribunalType', error);
          this.errorMessage = 'Erreur lors de la mise à jour du TribunalType';
          this.snackBar.open('Erreur lors de la mise à jour du type de tribunal', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/tribunal-types']);
  }
}