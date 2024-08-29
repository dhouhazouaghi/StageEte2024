import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierAxe } from '../../../../Models/DossierAxe';
import { DossierAxeService } from '../../../Services/dossier-axe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dossier-axe-modif',
  standalone: true,
 imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],
  templateUrl: './dossier-axe-modif.component.html',
  styleUrl: './dossier-axe-modif.component.scss'
})
export class DossierAxeModifComponent implements OnInit {
  dossierAxeForm: FormGroup;
  errorMessage: string = '';
  dossierAxeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dossierAxeService: DossierAxeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.dossierAxeForm = this.fb.group({
      dossierAxeLibelle: ['', Validators.required],
      dossierAxeLibelleArabe: ['', Validators.required],
      dossierAxeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierAxeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierAxeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.dossierAxeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.dossierAxeId) {
      this.dossierAxeService.getDossierAxeById(this.dossierAxeId).subscribe(
        (dossierAxe: DossierAxe) => {
          this.dossierAxeForm.patchValue(dossierAxe);
        },
        error => {
          console.error('Erreur lors de la récupération du dossier axe', error);
          this.errorMessage = 'Erreur lors de la récupération du dossier axe';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierAxeForm.patchValue({ dossierAxeEtat: target.checked ? 1 : 0 });
  }

  updateDossierAxe(): void {
    if (this.dossierAxeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.dossierAxeId !== null) {
      const dossierAxe: DossierAxe = { id: this.dossierAxeId, ...this.dossierAxeForm.value };
      this.dossierAxeService.updateDossierAxe(this.dossierAxeId, dossierAxe).subscribe(
        response => {
          console.log('DossierAxe mis à jour avec succès', response);
          this.snackBar.open('Dossier Axe mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/DossierAxesList']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du DossierAxe', error);
          this.errorMessage = 'Erreur lors de la mise à jour du DossierAxe';
          this.snackBar.open('Erreur lors de la mise à jour du dossier axe', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/DossierAxesList']);
  }
}
