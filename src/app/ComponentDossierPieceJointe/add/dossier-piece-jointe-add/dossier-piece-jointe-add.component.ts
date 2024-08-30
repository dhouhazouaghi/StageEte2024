import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DossierPieceJointe } from '../../../../Models/DossierPieceJointe';
import { DossierPieceJointeService } from '../../../Services/dossier-piece-jointe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dossier-piece-jointe-add',
  standalone: true,
  imports: [CommonModule,  FormsModule,ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],
  templateUrl: './dossier-piece-jointe-add.component.html',
  styleUrl: './dossier-piece-jointe-add.component.scss'
})
export class DossierPieceJointeAddComponent {
  dossierPieceJointeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dossierPieceJointeService: DossierPieceJointeService,
    private router: Router,
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

  addDossierPieceJointe(): void {
    if (this.dossierPieceJointeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

     this.dossierPieceJointeService.getAllDossierPieceJointes().subscribe(
      (dossierPieceJointes: DossierPieceJointe[]) => {
        const maxId = dossierPieceJointes.reduce((max, d) => d.id > max ? d.id : max, 0);
        const newId = maxId + 1;

         const dossierPieceJointe: DossierPieceJointe = { id: newId, ...this.dossierPieceJointeForm.value };
        this.dossierPieceJointeService.createDossierPieceJointe(dossierPieceJointe).subscribe(
          response => {
            console.log('DossierPieceJointe ajouté avec succès', response);
            this.snackBar.open('Pièce jointe du dossier ajoutée avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/PieceJointeList']);   
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout de la DossierPieceJointe', error);
            this.errorMessage = 'Erreur lors de l\'ajout de la pièce jointe du dossier';
            this.snackBar.open('Erreur lors de l\'ajout de la pièce jointe du dossier', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des pièces jointes du dossier', error);
        this.errorMessage = 'Erreur lors de la récupération des pièces jointes du dossier';
        this.snackBar.open('Erreur lors de la récupération des pièces jointes du dossier', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/PieceJointeList']); 
  }
}
