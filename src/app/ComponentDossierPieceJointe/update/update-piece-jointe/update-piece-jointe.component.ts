import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierPieceJointeService } from '../../../Services/dossier-piece-jointe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierPieceJointe } from '../../../../Models/DossierPieceJointe';

@Component({
  selector: 'app-update-piece-jointe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],

  templateUrl: './update-piece-jointe.component.html',
  styleUrl: './update-piece-jointe.component.scss'
})
export class UpdatePieceJointeComponent implements OnInit {
  dossierPieceJointeForm: FormGroup;
  errorMessage: string = '';
  dossierPieceJointeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dossierPieceJointeService: DossierPieceJointeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.dossierPieceJointeForm = this.fb.group({
      dossierPieceJointeLibelle: ['', Validators.required],
      dossierPieceJointeLibelleArabe: ['', Validators.required],
      dossierPieceJointeObligatoire: [0],
      dossierPieceJointeOriginale: [0],
      dossierPieceJointeOrdre: [0, Validators.required],
      dossierPieceJointeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dossierPieceJointeDescriptionArabe: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      dossierPieceJointeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.dossierPieceJointeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.dossierPieceJointeId) {
      this.dossierPieceJointeService.getDossierPieceJointeById(this.dossierPieceJointeId).subscribe(
        (dossierPieceJointe: DossierPieceJointe) => {
          this.dossierPieceJointeForm.patchValue(dossierPieceJointe);
        },
        error => {
          console.error('Erreur lors de la récupération de la pièce jointe', error);
          this.errorMessage = 'Erreur lors de la récupération de la pièce jointe';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierPieceJointeForm.patchValue({ dossierPieceJointeEtat: target.checked ? 1 : 0 });
  }

  onObligatoireChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierPieceJointeForm.patchValue({ dossierPieceJointeObligatoire: target.checked ? 1 : 0 });
  }

  onOriginaleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dossierPieceJointeForm.patchValue({ dossierPieceJointeOriginale: target.checked ? 1 : 0 });
  }

  updateDossierPieceJointe(): void {
    if (this.dossierPieceJointeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.dossierPieceJointeId !== null) {
      const dossierPieceJointe: DossierPieceJointe = { id: this.dossierPieceJointeId, ...this.dossierPieceJointeForm.value };
      this.dossierPieceJointeService.updateDossierPieceJointe(this.dossierPieceJointeId, dossierPieceJointe).subscribe(
        response => {
          console.log('DossierPieceJointe mis à jour avec succès', response);
          this.snackBar.open('Pièce jointe du dossier mise à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/PieceJointeList']);   
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de la pièce jointe', error);
          this.errorMessage = 'Erreur lors de la mise à jour de la pièce jointe';
          this.snackBar.open('Erreur lors de la mise à jour de la pièce jointe du dossier', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/PieceJointeList']);
  }
}
