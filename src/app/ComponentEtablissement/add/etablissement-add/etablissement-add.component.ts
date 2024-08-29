import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EtablissementServiceService } from '../../../Services/etablissement-service.service';
import { Etablissement } from '../../../../Models/Etablissement';

@Component({
  selector: 'app-etablissement-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './etablissement-add.component.html',
  styleUrl: './etablissement-add.component.scss'
})
export class EtablissementAddComponent {
  etablissementForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private etablissementService: EtablissementServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.etablissementForm = this.fb.group({
      etablissementLibelle: ['', Validators.required],
      etablissementTelephone: ['', Validators.required],
      etablissementAdresse: ['', Validators.required],
    });
  }

  addEtablissement(): void {
    if (this.etablissementForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all Etablissements to determine the max ID
    this.etablissementService.getEtablissements().subscribe(
      (etablissements: Etablissement[]) => {
        const maxId = etablissements.reduce((max, e) => e.id > max ? e.id : max, 0);
        const newId = maxId + 1;

        // Create a new Etablissement with the new ID
        const etablissement: Etablissement = { id: newId, ...this.etablissementForm.value };
        this.etablissementService.addEtablissement(etablissement).subscribe(
          response => {
            console.log('Etablissement ajouté avec succès', response);
            this.snackBar.open('Établissement ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/EtablissementList']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'Etablissement', error);
            this.errorMessage = 'Erreur lors de l\'ajout de l\'Etablissement';
            this.snackBar.open('Erreur lors de l\'ajout de l\'établissement', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des établissements', error);
        this.errorMessage = 'Erreur lors de la récupération des établissements';
        this.snackBar.open('Erreur lors de la récupération des établissements', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/EtablissementList']); 
  }
}
