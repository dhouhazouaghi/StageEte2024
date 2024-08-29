import { Component, OnInit } from '@angular/core';
import { EtatService } from '../../../Services/etat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Etat } from '../../../../Models/Etat';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-etat',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './update-etat.component.html',
  styleUrl: './update-etat.component.scss'
})

export class UpdateEtatComponent implements OnInit {
  etatForm: FormGroup;
  errorMessage: string = '';
  etatId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private etatService: EtatService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.etatId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.etatId) {
      this.etatService.getEtatById(this.etatId).subscribe(
        (etat: Etat) => {
          this.etatForm.patchValue(etat);
        },
        error => {
          console.error('Erreur lors de la récupération de l\'État', error);
          this.errorMessage = 'Erreur lors de la récupération de l\'État';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.etatForm.patchValue({ etatEtat: target.checked ? 1 : 0 });
  }

  updateEtat(): void {
    if (this.etatForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.etatId !== null) {
      const etat: Etat = { id: this.etatId, ...this.etatForm.value };
      this.etatService.updateEtat(this.etatId, etat).subscribe(
        response => {
          console.log('État mis à jour avec succès', response);
          this.snackBar.open('État mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/state']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'État', error);
          this.errorMessage = 'Erreur lors de la mise à jour de l\'État';
          this.snackBar.open('Erreur lors de la mise à jour de l\'État', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/state']);
  }
}