import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpertCompetenceService } from '../../../Services/expert-competence.service';
import { Router } from '@angular/router';
import { ExpertCompetence } from '../../../../Models/ExpertCompetence';

@Component({
  selector: 'app-expert-competence-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './expert-competence-add.component.html',
  styleUrl: './expert-competence-add.component.scss'
})
export class ExpertCompetenceAddComponent {
  expertCompetenceForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private expertCompetenceService: ExpertCompetenceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.expertCompetenceForm = this.fb.group({
      expertCompetenceLibelle: ['', Validators.required],
      expertCompetenceLibelleArabe: ['', Validators.required],
      expertCompetenceDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      expertCompetenceDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }



  addExpertCompetence(): void {
    if (this.expertCompetenceForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all ExpertCompetences to determine the max ID
    this.expertCompetenceService.getExpertCompetences().subscribe(
      (expertCompetences: ExpertCompetence[]) => {
        const maxId = expertCompetences.reduce((max, e) => e.id > max ? e.id : max, 0);
        const newId = maxId + 1;

        // Create a new ExpertCompetence with the new ID
        const expertCompetence: ExpertCompetence = { id: newId, ...this.expertCompetenceForm.value };
        this.expertCompetenceService.addExpertCompetence(expertCompetence).subscribe(
          response => {
            console.log('ExpertCompetence ajouté avec succès', response);
            this.snackBar.open('Compétence d\'expert ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/ExpertCompetenceList']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'ExpertCompetence', error);
            this.errorMessage = 'Erreur lors de l\'ajout de l\'ExpertCompetence';
            this.snackBar.open('Erreur lors de l\'ajout de la compétence d\'expert', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des compétences d\'expert', error);
        this.errorMessage = 'Erreur lors de la récupération des compétences d\'expert';
        this.snackBar.open('Erreur lors de la récupération des compétences d\'expert', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/ExpertCompetenceList']); 
  }
}
