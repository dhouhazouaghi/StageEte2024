import { Component, OnInit } from '@angular/core';
import { GouvernoratService } from '../../../Services/gouvernorat.service';
import { Router, RouterModule } from '@angular/router';
import { Gouvernorat } from '../../../../Models/Gouvernorat';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-gouvernorat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './add-gouvernorat.component.html',
  styleUrl: './add-gouvernorat.component.scss'
})
export class AddGouvernoratComponent {
  gouvernoratForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private gouvernoratService: GouvernoratService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.gouvernoratForm = this.fb.group({
      gouvernoratLibelle: ['', Validators.required],
      gouvernoratLibelleArabe: ['', Validators.required],
      gouvernoratEtat: [0]
    });
  console.log(this.gouvernoratForm.controls); 
    
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.gouvernoratForm.patchValue({ gouvernoratEtat: target.checked ? 1 : 0 });
  }

  addGouvernorat(): void {
    if (this.gouvernoratForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    
    // Fetch all Gouvernorats to determine the max ID
    this.gouvernoratService.getGouvernorats().subscribe(
      (gouvernorats: Gouvernorat[]) => {
        const maxId = gouvernorats.reduce((max, g) => g.id > max ? g.id : max, 0);
        const newId = maxId + 1;

        // Create a new Gouvernorat with the new ID
        const gouvernorat: Gouvernorat = { id: newId, ...this.gouvernoratForm.value };
        this.gouvernoratService.addGouvernorat(gouvernorat).subscribe(
          response => {
            console.log('Gouvernorat ajouté avec succès', response);
            this.snackBar.open('Gouvernorat ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/gov']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du Gouvernorat', error);
            this.errorMessage = 'Erreur lors de l\'ajout du Gouvernorat';
            this.snackBar.open('Erreur lors de l\'ajout du Gouvernorat', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des Gouvernorats', error);
        this.errorMessage = 'Erreur lors de la récupération des Gouvernorats';
        this.snackBar.open('Erreur lors de la récupération des Gouvernorats', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/gov']); 
  }
}