import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BureauSpecialiteService } from '../../../Services/bureau-specialite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauSpecialite } from '../../../../Models/BureauSpecialite';

@Component({
  selector: 'app-update-bureau-specialite',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],

  templateUrl: './update-bureau-specialite.component.html',
  styleUrl: './update-bureau-specialite.component.scss'
})
export class UpdateBureauSpecialiteComponent implements OnInit {
  bureauSpecialiteForm: FormGroup;
  errorMessage: string = '';
  bureauSpecialiteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bureauSpecialiteService: BureauSpecialiteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.bureauSpecialiteForm = this.fb.group({
      bureauSpecialiteLibelle: ['', Validators.required],
      bureauSpecialiteLibelleArabe: ['', Validators.required],
      bureauSpecialiteDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauSpecialiteDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauSpecialiteEtat: [0]
    });
  }

  ngOnInit(): void {
    this.bureauSpecialiteId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bureauSpecialiteId) {
      this.bureauSpecialiteService.getBureauSpecialiteById(this.bureauSpecialiteId).subscribe(
        (bureauSpecialite: BureauSpecialite) => {
          this.bureauSpecialiteForm.patchValue(bureauSpecialite);
        },
        error => {
          console.error('Erreur lors de la récupération du bureau spécialité', error);
          this.errorMessage = 'Erreur lors de la récupération du bureau spécialité';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.bureauSpecialiteForm.patchValue({ bureauSpecialiteEtat: target.checked ? 1 : 0 });
  }

  updateBureauSpecialite(): void {
    if (this.bureauSpecialiteForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.bureauSpecialiteId !== null) {
      const bureauSpecialite: BureauSpecialite = { id: this.bureauSpecialiteId, ...this.bureauSpecialiteForm.value };
      this.bureauSpecialiteService.updateBureauSpecialite(this.bureauSpecialiteId, bureauSpecialite).subscribe(
        response => {
          console.log('BureauSpecialite mis à jour avec succès', response);
          this.snackBar.open('Bureau spécialité mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/BureauSpecialiteList']);   
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du BureauSpecialite', error);
          this.errorMessage = 'Erreur lors de la mise à jour du BureauSpecialite';
          this.snackBar.open('Erreur lors de la mise à jour du bureau spécialité', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/BureauSpecialiteList']);
  }
}
