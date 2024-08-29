import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GouvernoratService } from '../../../Services/gouvernorat.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gouvernorat } from '../../../../Models/Gouvernorat';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-gouvernorat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],

  templateUrl: './update-gouvernorat.component.html',
  styleUrl: './update-gouvernorat.component.scss'
})
export class UpdateGouvernoratComponent {
  gouvernoratForm: FormGroup;
  errorMessage: string = '';
  id!: number;

  constructor(
    private fb: FormBuilder,
    private gouvernoratService: GouvernoratService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.gouvernoratForm = this.fb.group({
      gouvernoratLibelle: ['', Validators.required],
      gouvernoratLibelleArabe: ['', Validators.required],
      gouvernoratEtat: [0]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadGouvernorat();
  }

  loadGouvernorat(): void {
    this.gouvernoratService.getGouvernoratById(this.id).subscribe(
      (gouvernorat: Gouvernorat) => {
        this.gouvernoratForm.patchValue({
          gouvernoratLibelle: gouvernorat.gouvernoratLibelle,
          gouvernoratLibelleArabe: gouvernorat.gouvernoratLibelleArabe,
          gouvernoratEtat: gouvernorat.gouvernoratEtat
        });
      },
      error => {
        console.error('Erreur lors de la récupération du Gouvernorat', error);
        this.errorMessage = 'Erreur lors de la récupération du Gouvernorat';
      }
    );
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.gouvernoratForm.patchValue({ gouvernoratEtat: target.checked ? 1 : 0 });
  }

  updateGouvernorat(): void {
    if (this.gouvernoratForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const updatedGouvernorat: Gouvernorat = {
      id: this.id,
      ...this.gouvernoratForm.value
    };

    this.gouvernoratService.updateGouvernorat(this.id, updatedGouvernorat).subscribe(
      response => {
        console.log('Gouvernorat mis à jour avec succès', response);
        this.snackBar.open('Gouvernorat mis à jour avec succès', 'Fermer', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/gov']);  // Redirect after the snack bar is closed
        });
      },
      error => {
        console.error('Erreur lors de la mise à jour du Gouvernorat', error);
        this.errorMessage = 'Erreur lors de la mise à jour du Gouvernorat';
        this.snackBar.open('Erreur lors de la mise à jour du Gouvernorat', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/gov']);
  }
}
