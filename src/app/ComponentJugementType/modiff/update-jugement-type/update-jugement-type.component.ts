import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { JugementTypeService } from '../../../Services/jugement-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JugementType } from '../../../../Models/JugementType';

@Component({
  selector: 'app-update-jugement-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],
  templateUrl: './update-jugement-type.component.html',
  styleUrl: './update-jugement-type.component.scss'
})
export class UpdateJugementTypeComponent implements OnInit {
  jugementTypeForm: FormGroup;
  errorMessage: string = '';
  jugementTypeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private jugementTypeService: JugementTypeService,  // Adjust service
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.jugementTypeForm = this.fb.group({
      jugementTypeLibelle: ['', Validators.required],
      jugementTypeLibelleArabe: ['', Validators.required],
      jugementTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      jugementTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      jugementTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.jugementTypeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.jugementTypeId) {
      this.jugementTypeService.getJugementTypeById(this.jugementTypeId).subscribe(
        (jugementType: JugementType) => {
          this.jugementTypeForm.patchValue(jugementType);
        },
        error => {
          console.error('Erreur lors de la récupération du type de jugement', error);
          this.errorMessage = 'Erreur lors de la récupération du type de jugement';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.jugementTypeForm.patchValue({ jugementTypeEtat: target.checked ? 1 : 0 });
  }

  updateJugementType(): void {
    if (this.jugementTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.jugementTypeId !== null) {
      const jugementType: JugementType = { id: this.jugementTypeId, ...this.jugementTypeForm.value };
      this.jugementTypeService.updateJugementType(this.jugementTypeId, jugementType).subscribe(
        response => {
          console.log('JugementType mis à jour avec succès', response);
          this.snackBar.open('Type de jugement mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/jugement']);  // Adjust navigation path
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du JugementType', error);
          this.errorMessage = 'Erreur lors de la mise à jour du JugementType';
          this.snackBar.open('Erreur lors de la mise à jour du type de jugement', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/jugement']);  // Adjust navigation path
  }

}
