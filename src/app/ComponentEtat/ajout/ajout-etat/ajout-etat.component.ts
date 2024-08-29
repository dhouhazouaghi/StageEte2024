import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EtatService } from '../../../Services/etat.service';
import { Etat } from '../../../../Models/Etat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-etat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule], 

  templateUrl: './ajout-etat.component.html',
  styleUrl: './ajout-etat.component.scss'
})
export class AjoutEtatComponent   {
  etatForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private etatService: EtatService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.etatForm = this.fb.group({
      etatLibelle: ['', Validators.required],
      etatLibelleArabe: ['', Validators.required],
      etatDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      etatDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      etatEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.etatForm.patchValue({ etatEtat: target.checked ? 1 : 0 });
  }

  addEtat(): void {
    if (this.etatForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
  
    this.etatService.getEtats().subscribe(
      (etats: Etat[]) => {
        const maxId = etats.reduce((max, t) => t.id > max ? t.id : max, 0);
        const newId = maxId + 1;

        const etat: Etat = { id: newId, ...this.etatForm.value };
        this.etatService.addEtat(etat).subscribe(
          response => {
            console.log('Etat ajouté avec succès', response);
            this.snackBar.open('État ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/state']);
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'État', error);
            this.errorMessage = 'Erreur lors de l\'ajout de l\'État';
            this.snackBar.open('Erreur lors de l\'ajout de l\'État', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des États', error);
        this.errorMessage = 'Erreur lors de la récupération des États';
        this.snackBar.open('Erreur lors de la récupération des États', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  
  onCancel() {
    this.router.navigate(['/state']); 
  }
  
}
