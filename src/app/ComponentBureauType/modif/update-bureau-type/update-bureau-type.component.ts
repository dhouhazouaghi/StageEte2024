import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BureauTypeService } from '../../../Services/bureau-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauType } from '../../../../Models/BureauType';

@Component({
  selector: 'app-update-bureau-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './update-bureau-type.component.html',
  styleUrl: './update-bureau-type.component.scss'
})
export class UpdateBureauTypeComponent implements OnInit {
  bureauTypeForm: FormGroup;
  errorMessage: string = '';
  bureauTypeId: number | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private bureauTypeService: BureauTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.bureauTypeForm = this.fb.group({
      bureauTypeLibelle: ['', Validators.required],
      bureauTypeLibelleArabe: ['', Validators.required],
      bureauTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      bureauTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.bureauTypeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bureauTypeId) {
      this.bureauTypeService.getBureauTypeById(this.bureauTypeId).subscribe(
        (bureauType: BureauType) => {
          this.bureauTypeForm.patchValue(bureauType);
        },
        error => {
          console.error('Erreur lors de la récupération du type de bureau', error);
          this.errorMessage = 'Erreur lors de la récupération du type de bureau';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.bureauTypeForm.patchValue({ bureauTypeEtat: target.checked ? 1 : 0 });
  }

  updateBureauType(): void {
    if (this.bureauTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.bureauTypeId !== null) {
      const bureauType: BureauType = { id: this.bureauTypeId, ...this.bureauTypeForm.value };
      this.bureauTypeService.updateBureauType(this.bureauTypeId, bureauType).subscribe(
        response => {
          console.log('BureauType mis à jour avec succès', response);
          this.snackBar.open('Type de bureau mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/bureau-types']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du BureauType', error);
          this.errorMessage = 'Erreur lors de la mise à jour du BureauType';
          this.snackBar.open('Erreur lors de la mise à jour du type de bureau', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/bureau-types']);
  }
}
