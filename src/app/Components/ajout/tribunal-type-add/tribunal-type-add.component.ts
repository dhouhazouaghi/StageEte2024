import { Component } from '@angular/core';
import { TribunalTypeServicesService } from '../../../NewServices/tribunal-type-services.service';
import { Router } from '@angular/router';
import { TribunalType } from '../../../../Models/TribunalType';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-tribunal-type-add',
  standalone: true,
  imports: [CommonModule,  FormsModule,ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],
  templateUrl: './tribunal-type-add.component.html',
  styleUrl: './tribunal-type-add.component.scss'
})
export class TribunalTypeAddComponent {
  tribunalTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private tribunalTypeService: TribunalTypeServicesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.tribunalTypeForm = this.fb.group({
      tribunalTypeRef: [0, Validators.required],
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
  
    const tribunalType: TribunalType = this.tribunalTypeForm.value;
    this.tribunalTypeService.addTribunalType(tribunalType).subscribe(
      response => {
        console.log('TribunalType ajouté avec succès', response);
        this.snackBar.open('Type de tribunal ajouté avec succès', 'Fermer', {
          duration: 3000,  // Durée en millisecondes
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/tribunal-types']);  // Redirection après que le snack bar soit fermé
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
  }
  
  onCancel() {
    this.router.navigate(['/tribunal-types']); 
  }
}
