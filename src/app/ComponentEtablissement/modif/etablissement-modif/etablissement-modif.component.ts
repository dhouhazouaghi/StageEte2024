import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EtablissementServiceService } from '../../../Services/etablissement-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Etablissement } from '../../../../Models/Etablissement';

@Component({
  selector: 'app-etablissement-modif',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , MatFormFieldModule , MatInputModule, MatSnackBarModule],

  templateUrl: './etablissement-modif.component.html',
  styleUrl: './etablissement-modif.component.scss'
})
export class EtablissementModifComponent implements OnInit {
  etablissementForm: FormGroup;
  errorMessage: string = '';
  etablissementId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private etablissementService: EtablissementServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.etablissementForm = this.fb.group({
      etablissementLibelle: ['', Validators.required],
      etablissementTelephone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4}|\d{1,4})?\s?\d{7,}$/)]], // Example pattern for phone numbers
      etablissementAdresse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.etablissementId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.etablissementId) {
      this.etablissementService.getEtablissementById(this.etablissementId).subscribe(
        (etablissement: Etablissement) => {
          this.etablissementForm.patchValue(etablissement);
        },
        error => {
          console.error('Erreur lors de la récupération de l\'établissement', error);
          this.errorMessage = 'Erreur lors de la récupération de l\'établissement';
        }
      );
    }
  }

  updateEtablissement(): void {
    if (this.etablissementForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.etablissementId !== null) {
      const etablissement: Etablissement = { id: this.etablissementId, ...this.etablissementForm.value };
      this.etablissementService.updateEtablissement(this.etablissementId, etablissement).subscribe(
        response => {
          console.log('Etablissement mis à jour avec succès', response);
          this.snackBar.open('Établissement mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/EtablissementList']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'établissement', error);
          this.errorMessage = 'Erreur lors de la mise à jour de l\'établissement';
          this.snackBar.open('Erreur lors de la mise à jour de l\'établissement', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/EtablissementList']);
  }
}
