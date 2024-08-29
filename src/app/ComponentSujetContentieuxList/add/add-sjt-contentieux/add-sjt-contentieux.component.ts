import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentieuxSujetService } from '../../../Services/contentieux-sujet.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentieuxSujet } from '../../../../Models/ContentieuxSujet';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-sjt-contentieux',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './add-sjt-contentieux.component.html',
  styleUrl: './add-sjt-contentieux.component.scss'
})
export class AddSjtContentieuxComponent {
  contentieuxSujetForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contentieuxSujetService: ContentieuxSujetService,
    private router: Router,
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

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.contentieuxSujetForm.patchValue({ contentieuxSujetEtat: target.checked ? 1 : 0 });
  }

  addContentieuxSujet(): void {
    if (this.contentieuxSujetForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all ContentieuxSujets to determine the max ID
    this.contentieuxSujetService.getAllContentieuxSujets().subscribe(
      (contentieuxSujets: ContentieuxSujet[]) => {
        const maxId = contentieuxSujets.reduce((max, s) => s.id > max ? s.id : max, 0);
        const newId = maxId + 1;

        // Create a new ContentieuxSujet with the new ID
        const contentieuxSujet: ContentieuxSujet = { id: newId, ...this.contentieuxSujetForm.value };
        this.contentieuxSujetService.addContentieuxSujet(contentieuxSujet).subscribe(
          response => {
            console.log('ContentieuxSujet ajouté avec succès', response);
            this.snackBar.open('Sujet de contentieux ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/contentieux-sujets']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du ContentieuxSujet', error);
            this.errorMessage = 'Erreur lors de l\'ajout du ContentieuxSujet';
            this.snackBar.open('Erreur lors de l\'ajout du sujet de contentieux', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des sujets de contentieux', error);
        this.errorMessage = 'Erreur lors de la récupération des sujets de contentieux';
        this.snackBar.open('Erreur lors de la récupération des sujets de contentieux', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/contentieux-sujets']); 
  }
}
