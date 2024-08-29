import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AffaireSensService } from '../../../Services/affaire-sens.service';
import { Router } from '@angular/router';
import { AffaireSens } from '../../../../Models/AffaireSens';

@Component({
  selector: 'app-add-affaire-sens',
  standalone: true,
  imports: [CommonModule,  FormsModule,ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],  
  templateUrl: './add-affaire-sens.component.html',
  styleUrl: './add-affaire-sens.component.scss'
})
export class AddAffaireSensComponent {
  affaireSensForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private affaireSensService: AffaireSensService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.affaireSensForm = this.fb.group({
      affaireSensLibelle: ['', Validators.required],
      affaireSensLibelleArabe: ['', Validators.required],
      affaireSensEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.affaireSensForm.patchValue({ affaireSensEtat: target.checked ? 1 : 0 });
  }

  addAffaireSens(): void {
    if (this.affaireSensForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.affaireSensService.getAffaireSens().subscribe(
      (affaireSensList: AffaireSens[]) => {
        const maxId = affaireSensList.reduce((max, a) => a.id > max ? a.id : max, 0);
        const newId = maxId + 1;

        const affaireSens: AffaireSens = { id: newId, ...this.affaireSensForm.value };
        this.affaireSensService.createAffaireSens(affaireSens).subscribe(
          response => {
            console.log('AffaireSens ajouté avec succès', response);
            this.snackBar.open('Affaire Sens ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/AffaireSensList']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'AffaireSens', error);
            this.errorMessage = 'Erreur lors de l\'ajout de l\'AffaireSens';
            this.snackBar.open('Erreur lors de l\'ajout de l\'Affaire Sens', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des AffaireSens', error);
        this.errorMessage = 'Erreur lors de la récupération des AffaireSens';
        this.snackBar.open('Erreur lors de la récupération des AffaireSens', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/AffaireSensList']); 
  }
}
