import { Component, OnInit } from '@angular/core';
import { TribunalTypeServicesService } from '../../../NewServices/tribunal-type-services.service';
import { TribunalType } from '../../../../Models/TribunalType';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tribunal-type-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatInputModule, MatSnackBarModule],
  templateUrl: './tribunal-type-update.component.html',
  styleUrl: './tribunal-type-update.component.scss'
})
export class TribunalTypeUpdateComponent implements OnInit {
  tribunalTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private tribunalTypeService: TribunalTypeServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.tribunalTypeForm = this.fb.group({
      tribunalTypeRef: [{ value: 0, disabled: true }, Validators.required],
      tribunalTypeLibelle: ['', Validators.required],
      tribunalTypeLibelleArabe: ['', Validators.required],
      tribunalTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      tribunalTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      tribunalTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    if (isNaN(id)) {
      console.error('ID invalide');
      this.errorMessage = 'ID invalide';
      return;
    }

    this.tribunalTypeService.getTribunalTypeById(id).subscribe(
      (data: TribunalType) => {
        this.tribunalTypeForm.patchValue(data);
      },
      error => {
        console.error('Erreur lors de la récupération des détails du TribunalType', error);
        this.errorMessage = 'Erreur lors de la récupération des détails du TribunalType';
      }
    );
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.tribunalTypeForm.patchValue({ tribunalTypeEtat: target.checked ? 1 : 0 });
  }

  updateTribunalType(): void {
    if (this.tribunalTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
  
    const tribunalType: TribunalType = this.tribunalTypeForm.value;
    const tribunalTypeRef = this.tribunalTypeForm.get('tribunalTypeRef')?.value;
  
    if (!tribunalTypeRef) {
      this.errorMessage = 'Référence du TribunalType manquante.';
      return;
    }
  
    this.tribunalTypeService.updateTribunalType(tribunalTypeRef, tribunalType).subscribe(
      response => {
        console.log('TribunalType mis à jour avec succès', response);
        this.snackBar.open('Type de tribunal mis à jour avec succès', 'Fermer', {
          duration: 3000,  // Durée en millisecondes
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/tribunal-types']);  // Redirection après que le snack bar soit fermé
        });
      },
      error => {
        console.error('Erreur lors de la mise à jour du TribunalType', error);
        this.errorMessage = 'Erreur lors de la mise à jour du TribunalType';
        this.snackBar.open('Erreur lors de la mise à jour du type de tribunal', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  

  onCancel(): void {
    this.router.navigate(['/tribunal-types']);
  }
}
