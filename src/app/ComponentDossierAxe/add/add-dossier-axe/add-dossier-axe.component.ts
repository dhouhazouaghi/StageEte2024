import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierAxeService } from '../../../Services/dossier-axe.service';
import { Router } from '@angular/router';
import { DossierAxe } from '../../../../Models/DossierAxe';

@Component({
  selector: 'app-add-dossier-axe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],
  templateUrl: './add-dossier-axe.component.html',
  styleUrl: './add-dossier-axe.component.scss'
})
export class AddDossierAxeComponent {
  dossierAxeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dossierAxeService: DossierAxeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.dossierAxeForm = this.fb.group({
      dossierAxeLibelle: ['', Validators.required],
      dossierAxeLibelleArabe: ['', Validators.required],
      dossierAxeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierAxeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierAxeEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierAxeForm.patchValue({ dossierAxeEtat: target.checked ? 1 : 0 });
  }

  addDossierAxe(): void {
    if (this.dossierAxeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all DossierAxes to determine the max ID
    this.dossierAxeService.getAllDossierAxes().subscribe(
      (dossierAxes: DossierAxe[]) => {
        const maxId = dossierAxes.reduce((max, t) => t.id > max ? t.id : max, 0);
        const newId = maxId + 1;

        // Create a new DossierAxe with the new ID
        const dossierAxe: DossierAxe = { id: newId, ...this.dossierAxeForm.value };
        this.dossierAxeService.createDossierAxe(dossierAxe).subscribe(
          response => {
            console.log('DossierAxe ajouté avec succès', response);
            this.snackBar.open('Dossier Axe ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/DossierAxesList']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du DossierAxe', error);
            this.errorMessage = 'Erreur lors de l\'ajout du DossierAxe';
            this.snackBar.open('Erreur lors de l\'ajout du DossierAxe', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des DossierAxes', error);
        this.errorMessage = 'Erreur lors de la récupération des DossierAxes';
        this.snackBar.open('Erreur lors de la récupération des DossierAxes', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/DossierAxesList']); 
  }
}
