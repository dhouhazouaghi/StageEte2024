import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BureauSpecialiteService } from '../../../Services/bureau-specialite.service';
import { Router } from '@angular/router';
import { BureauSpecialite } from '../../../../Models/BureauSpecialite';

@Component({
  selector: 'app-add-bureau-specialite',
  standalone: true,
  imports: [CommonModule,  FormsModule,ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],  
    templateUrl: './add-bureau-specialite.component.html',
  styleUrl: './add-bureau-specialite.component.scss'
})
export class AddBureauSpecialiteComponent {
  bureauSpecialiteForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private bureauSpecialiteService: BureauSpecialiteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bureauSpecialiteForm = this.fb.group({
      bureauSpecialiteLibelle: ['', Validators.required],
      bureauSpecialiteLibelleArabe: ['', Validators.required],
      bureauSpecialiteDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauSpecialiteDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauSpecialiteEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.bureauSpecialiteForm.patchValue({ bureauSpecialiteEtat: target.checked ? 1 : 0 });
  }

  addBureauSpecialite(): void {
    if (this.bureauSpecialiteForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all BureauSpecialites to determine the max ID
    this.bureauSpecialiteService.getBureauSpecialites().subscribe(
      (bureauSpecialites: BureauSpecialite[]) => {
        const maxId = bureauSpecialites.reduce((max, b) => b.id > max ? b.id : max, 0);
        const newId = maxId + 1;

        // Create a new BureauSpecialite with the new ID
        const bureauSpecialite: BureauSpecialite = { id: newId, ...this.bureauSpecialiteForm.value };
        this.bureauSpecialiteService.addBureauSpecialite(bureauSpecialite).subscribe(
          response => {
            console.log('BureauSpecialite ajouté avec succès', response);
            this.snackBar.open('Spécialité du bureau ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/bureau-specialites']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du BureauSpecialite', error);
            this.errorMessage = 'Erreur lors de l\'ajout du BureauSpecialite';
            this.snackBar.open('Erreur lors de l\'ajout de la spécialité du bureau', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des spécialités de bureau', error);
        this.errorMessage = 'Erreur lors de la récupération des spécialités de bureau';
        this.snackBar.open('Erreur lors de la récupération des spécialités de bureau', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/bureau-specialites']); 
  }
}
