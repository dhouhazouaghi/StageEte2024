import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AvocatSpecialiteService } from '../../../Services/avocat-specialite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AvocatSpecialite } from '../../../../Models/AvocatSpecialite';

@Component({
  selector: 'app-avocat-specialite-modif',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],

  templateUrl: './avocat-specialite-modif.component.html',
  styleUrl: './avocat-specialite-modif.component.scss'
})
export class AvocatSpecialiteModifComponent implements OnInit {
  avocatSpecialiteForm: FormGroup;
  errorMessage: string = '';
  avocatSpecialiteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private avocatSpecialiteService: AvocatSpecialiteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.avocatSpecialiteForm = this.fb.group({
      avocatSpecialiteLibelle: ['', Validators.required],
      avocatSpecialiteLibelleArabe: ['', Validators.required],
      avocatSpecialiteDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      avocatSpecialiteDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      avocatSpecialiteEtat: [0] // Assuming 0 for false and 1 for true
    });
  }

  ngOnInit(): void {
    this.avocatSpecialiteId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.avocatSpecialiteId) {
      this.avocatSpecialiteService.getAvocatSpecialiteById(this.avocatSpecialiteId).subscribe(
        (avocatSpecialite: AvocatSpecialite) => {
          this.avocatSpecialiteForm.patchValue(avocatSpecialite);
        },
        error => {
          console.error('Erreur lors de la récupération de l\'avocat spécialité', error);
          this.errorMessage = 'Erreur lors de la récupération de l\'avocat spécialité';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.avocatSpecialiteForm.patchValue({ avocatSpecialiteEtat: target.checked ? 1 : 0 });
  }

  updateAvocatSpecialite(): void {
    if (this.avocatSpecialiteForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.avocatSpecialiteId !== null) {
      const avocatSpecialite: AvocatSpecialite = { id: this.avocatSpecialiteId, ...this.avocatSpecialiteForm.value };
      this.avocatSpecialiteService.updateAvocatSpecialite(this.avocatSpecialiteId, avocatSpecialite).subscribe(
        response => {
          console.log('AvocatSpecialite mis à jour avec succès', response);
          this.snackBar.open('Avocat spécialité mise à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/AvocatSpecialiteList']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'avocat spécialité', error);
          this.errorMessage = 'Erreur lors de la mise à jour de l\'avocat spécialité';
          this.snackBar.open('Erreur lors de la mise à jour de l\'avocat spécialité', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/AvocatSpecialiteList']);
  }
}