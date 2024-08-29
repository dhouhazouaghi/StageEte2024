import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AvocatSpecialiteService } from '../../../Services/avocat-specialite.service';
import { Router } from '@angular/router';
import { AvocatSpecialite } from '../../../../Models/AvocatSpecialite';

@Component({
  selector: 'app-avocat-specialite-add',
  standalone: true,
  imports: [CommonModule,  FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],   
  templateUrl: './avocat-specialite-add.component.html',
  styleUrl: './avocat-specialite-add.component.scss'
})
export class AvocatSpecialiteAddComponent {
  avocatSpecialiteForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private avocatSpecialiteService: AvocatSpecialiteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.avocatSpecialiteForm = this.fb.group({
      avocatSpecialiteLibelle: ['', Validators.required],
      avocatSpecialiteLibelleArabe: ['', Validators.required],
      avocatSpecialiteDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      avocatSpecialiteDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      avocatSpecialiteEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.avocatSpecialiteForm.patchValue({ avocatSpecialiteEtat: target.checked ? 1 : 0 });
  }

  addAvocatSpecialite(): void {
    if (this.avocatSpecialiteForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all AvocatSpecialites to determine the max ID
    this.avocatSpecialiteService.getAvocatSpecialites().subscribe(
      (avocatSpecialites: AvocatSpecialite[]) => {
        const maxId = avocatSpecialites.reduce((max, a) => a.id > max ? a.id : max, 0);
        const newId = maxId + 1;

        // Create a new AvocatSpecialite with the new ID
        const avocatSpecialite: AvocatSpecialite = { id: newId, ...this.avocatSpecialiteForm.value };
        this.avocatSpecialiteService.addAvocatSpecialite(avocatSpecialite).subscribe(
          response => {
            console.log('AvocatSpecialite ajouté avec succès', response);
            this.snackBar.open('Spécialité de l\'avocat ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/AvocatSpecialiteList']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'AvocatSpecialite', error);
            this.errorMessage = 'Erreur lors de l\'ajout de l\'AvocatSpecialite';
            this.snackBar.open('Erreur lors de l\'ajout de la spécialité de l\'avocat', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des spécialités d\'avocat', error);
        this.errorMessage = 'Erreur lors de la récupération des spécialités d\'avocat';
        this.snackBar.open('Erreur lors de la récupération des spécialités d\'avocat', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/AvocatSpecialiteList']); 
  }
}
