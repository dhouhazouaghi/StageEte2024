import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BureauTypeService } from '../../../Services/bureau-type.service';
import { Router } from '@angular/router';
import { BureauType } from '../../../../Models/BureauType';

@Component({
  selector: 'app-add-bureau-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './add-bureau-type.component.html',
  styleUrl: './add-bureau-type.component.scss'
})
export class AddBureauTypeComponent {
  bureauTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private bureauTypeService: BureauTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bureauTypeForm = this.fb.group({
      bureauTypeLibelle: ['', Validators.required],
      bureauTypeLibelleArabe: ['', Validators.required],
      bureauTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauTypeEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.bureauTypeForm.patchValue({ bureauTypeEtat: target.checked ? 1 : 0 });
  }

  addBureauType(): void {
    if (this.bureauTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all BureauTypes to determine the max ID
    this.bureauTypeService.getBureauTypes().subscribe(
      (bureauTypes: BureauType[]) => {
        const maxId = bureauTypes.reduce((max, b) => b.id > max ? b.id : max, 0);
        const newId = maxId + 1;

        // Create a new BureauType with the new ID
        const bureauType: BureauType = { id: newId, ...this.bureauTypeForm.value };
        this.bureauTypeService.addBureauType(bureauType).subscribe(
          response => {
            console.log('BureauType ajouté avec succès', response);
            this.snackBar.open('Type de bureau ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/bureau-types']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du BureauType', error);
            this.errorMessage = 'Erreur lors de l\'ajout du BureauType';
            this.snackBar.open('Erreur lors de l\'ajout du type de bureau', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des types de bureau', error);
        this.errorMessage = 'Erreur lors de la récupération des types de bureau';
        this.snackBar.open('Erreur lors de la récupération des types de bureau', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/bureau-types']); 
  }
}
