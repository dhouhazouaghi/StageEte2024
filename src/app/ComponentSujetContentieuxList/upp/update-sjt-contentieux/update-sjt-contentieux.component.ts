import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentieuxSujetService } from '../../../Services/contentieux-sujet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentieuxSujet } from '../../../../Models/ContentieuxSujet';

@Component({
  selector: 'app-update-sjt-contentieux',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],
  templateUrl: './update-sjt-contentieux.component.html',
  styleUrl: './update-sjt-contentieux.component.scss'
})
export class UpdateSjtContentieuxComponent implements OnInit {
  contentieuxSujetForm: FormGroup;
  errorMessage: string = '';
  contentieuxSujetId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contentieuxSujetService: ContentieuxSujetService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.contentieuxSujetForm = this.fb.group({
      contentieuxSujetLibelle: ['', Validators.required],
      contentieuxSujetLibelleArabe: ['', Validators.required],
      contentieuxDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      contentieuxDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      contentieuxSujetEtat: [0]
    });
  }

  ngOnInit(): void {
    this.contentieuxSujetId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.contentieuxSujetId) {
      this.contentieuxSujetService.getContentieuxSujetById(this.contentieuxSujetId).subscribe(
        (contentieuxSujet: ContentieuxSujet) => {
          this.contentieuxSujetForm.patchValue(contentieuxSujet);
        },
        error => {
          console.error('Erreur lors de la récupération du sujet contentieux', error);
          this.errorMessage = 'Erreur lors de la récupération du sujet contentieux';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.contentieuxSujetForm.patchValue({ contentieuxSujetEtat: target.checked ? 1 : 0 });
  }

  updateContentieuxSujet(): void {
    if (this.contentieuxSujetForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.contentieuxSujetId !== null) {
      const contentieuxSujet: ContentieuxSujet = { id: this.contentieuxSujetId, ...this.contentieuxSujetForm.value };
      this.contentieuxSujetService.updateContentieuxSujet(this.contentieuxSujetId, contentieuxSujet).subscribe(
        response => {
          console.log('ContentieuxSujet mis à jour avec succès', response);
          this.snackBar.open('Sujet contentieux mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/SujetContentieuxList']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du ContentieuxSujet', error);
          this.errorMessage = 'Erreur lors de la mise à jour du sujet contentieux';
          this.snackBar.open('Erreur lors de la mise à jour du sujet contentieux', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/SujetContentieuxList']);
  }
}