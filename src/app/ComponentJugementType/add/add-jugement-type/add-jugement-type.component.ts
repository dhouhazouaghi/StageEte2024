import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JugementTypeService } from '../../../Services/jugement-type.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { JugementType } from '../../../../Models/JugementType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-jugement-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './add-jugement-type.component.html',
  styleUrl: './add-jugement-type.component.scss'
})
export class AddJugementTypeComponent  {
  jugementTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private jugementTypeService: JugementTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.jugementTypeForm = this.fb.group({
      jugementTypeLibelle: ['', Validators.required],
      jugementTypeLibelleArabe: ['', Validators.required],
      jugementTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      jugementTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      jugementTypeEtat: [1] 
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.jugementTypeForm.patchValue({ jugementTypeEtat: target.checked ? 1 : 0 });
  }

  addJugementType(): void {
    if (this.jugementTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
  
    // Fetch all JugementTypes to determine the max ID
    this.jugementTypeService.getAllJugementTypes().subscribe(
      (jugementTypes: JugementType[]) => {
        const maxId = jugementTypes.reduce((max, j) => j.id > max ? j.id : max, 0);
        const newId = maxId + 1;

        // Create a new JugementType with the new ID
        const jugementType: JugementType = { id: newId, ...this.jugementTypeForm.value };
        this.jugementTypeService.addJugementType(jugementType).subscribe(
          response => {
            console.log('JugementType ajouté avec succès', response);
            this.snackBar.open('Type de jugement ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/jugement']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du JugementType', error);
            this.errorMessage = 'Erreur lors de l\'ajout du JugementType';
            this.snackBar.open('Erreur lors de l\'ajout du type de jugement', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des types de jugement', error);
        this.errorMessage = 'Erreur lors de la récupération des types de jugement';
        this.snackBar.open('Erreur lors de la récupération des types de jugement', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/jugement']); 
  }
}
