import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExpertCompetenceService } from '../../../Services/expert-competence.service';
import { ExpertCompetence } from '../../../../Models/ExpertCompetence';

@Component({
  selector: 'app-update-ex-comp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],

  templateUrl: './update-ex-comp.component.html',
  styleUrl: './update-ex-comp.component.scss'
})
export class UpdateExCompComponent implements OnInit {
  expertCompetenceForm: FormGroup;
  errorMessage: string = '';
  expertCompetenceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private expertCompetenceService: ExpertCompetenceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.expertCompetenceForm = this.fb.group({
      expertCompetenceLibelle: ['', Validators.required],
      expertCompetenceLibelleArabe: ['', Validators.required],
      expertCompetenceDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      expertCompetenceDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    this.expertCompetenceId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.expertCompetenceId) {
      this.expertCompetenceService.getExpertCompetenceById(this.expertCompetenceId).subscribe(
        (expertCompetence: ExpertCompetence) => {
          this.expertCompetenceForm.patchValue(expertCompetence);
        },
        error => {
          console.error('Erreur lors de la récupération de la compétence expert', error);
          this.errorMessage = 'Erreur lors de la récupération de la compétence expert';
        }
      );
    }
  }

  updateExpertCompetence(): void {
    if (this.expertCompetenceForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.expertCompetenceId !== null) {
      const expertCompetence: ExpertCompetence = { id: this.expertCompetenceId, ...this.expertCompetenceForm.value };
      this.expertCompetenceService.updateExpertCompetence(this.expertCompetenceId, expertCompetence).subscribe(
        response => {
          console.log('ExpertCompetence mis à jour avec succès', response);
          this.snackBar.open('Compétence expert mise à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/ExpertCompetenceList']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'ExpertCompetence', error);
          this.errorMessage = 'Erreur lors de la mise à jour de la compétence expert';
          this.snackBar.open('Erreur lors de la mise à jour de la compétence expert', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/ExpertCompetenceList']);
  }
}
