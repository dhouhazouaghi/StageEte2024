import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AffaireSensService } from '../../../Services/affaire-sens.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AffaireSens } from '../../../../Models/AffaireSens';

@Component({
  selector: 'app-update-affaire-sens',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './update-affaire-sens.component.html',
  styleUrl: './update-affaire-sens.component.scss'
})
export class UpdateAffaireSensComponent implements OnInit {
  affaireSensForm: FormGroup;
  errorMessage: string = '';
  affaireSensId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private affaireSensService: AffaireSensService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.affaireSensForm = this.fb.group({
      affaireSensLibelle: ['', Validators.required],
      affaireSensLibelleArabe: ['', Validators.required],
      affaireSensEtat: [0]
    });
  }

  ngOnInit(): void {
    this.affaireSensId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.affaireSensId) {
      this.affaireSensService.getAffaireSensById(this.affaireSensId).subscribe(
        (affaireSens: AffaireSens) => {
          this.affaireSensForm.patchValue(affaireSens);
        },
        error => {
          console.error('Erreur lors de la récupération du type d\'affaire', error);
          this.errorMessage = 'Erreur lors de la récupération du type d\'affaire';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.affaireSensForm.patchValue({ affaireSensEtat: target.checked ? 1 : 0 });
  }

  updateAffaireSens(): void {
    if (this.affaireSensForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.affaireSensId !== null) {
      const affaireSens: AffaireSens = { id: this.affaireSensId, ...this.affaireSensForm.value };
      this.affaireSensService.updateAffaireSens(this.affaireSensId, affaireSens).subscribe(
        response => {
          console.log('AffaireSens mis à jour avec succès', response);
          this.snackBar.open('Type d\'affaire mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/AffaireSensList']);  
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du AffaireSens', error);
          this.errorMessage = 'Erreur lors de la mise à jour du AffaireSens';
          this.snackBar.open('Erreur lors de la mise à jour du type d\'affaire', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/AffaireSensList']);
  }
}