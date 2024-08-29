import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TribunalTypeService } from '../../../Services/tribunal-type.service';
import { Router } from '@angular/router';
import { TribunalType } from '../../../../Models/Tribunal';

@Component({
  selector: 'app-add-tribunal-type',
  standalone: true,
  imports: [CommonModule,  FormsModule,ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],
  templateUrl: './add-tribunal-type.component.html',
  styleUrl: './add-tribunal-type.component.scss'
})
export class AddTribunalTypeComponent {
  tribunalTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private tribunalTypeService: TribunalTypeService,
    private router: Router,
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

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.tribunalTypeForm.patchValue({ tribunalTypeEtat: target.checked ? 1 : 0 });
  }

  addTribunalType(): void {
    if (this.tribunalTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
  
    // Fetch all TribunalTypes to determine the max ID
    this.tribunalTypeService.getTribunalTypes().subscribe(
      (tribunalTypes: TribunalType[]) => {
        const maxId = tribunalTypes.reduce((max, t) => t.id > max ? t.id : max, 0);
        const newId = maxId + 1;

        // Create a new TribunalType with the new ID
        const tribunalType: TribunalType = { id: newId, ...this.tribunalTypeForm.value };
        this.tribunalTypeService.addTribunalType(tribunalType).subscribe(
          response => {
            console.log('TribunalType ajouté avec succès', response);
            this.snackBar.open('Type de tribunal ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/tribunal-types']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du TribunalType', error);
            this.errorMessage = 'Erreur lors de l\'ajout du TribunalType';
            this.snackBar.open('Erreur lors de l\'ajout du type de tribunal', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des types de tribunal', error);
        this.errorMessage = 'Erreur lors de la récupération des types de tribunal';
        this.snackBar.open('Erreur lors de la récupération des types de tribunal', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  
  onCancel() {
    this.router.navigate(['/tribunal-types']); 
  }
}
