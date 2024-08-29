import { Component, OnInit } from '@angular/core';
import { ClientTypeService } from '../../../Services/client-type.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientType } from '../../../../Models/clientType';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],

  templateUrl: './add-client-type.component.html',
  styleUrl: './add-client-type.component.scss'
})
export class AddClientTypeComponent  {
  clientTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clientTypeService: ClientTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.clientTypeForm = this.fb.group({
      clientTypeLibelle: ['', Validators.required],
      clientTypeLibelleArabe: ['', Validators.required],
      clientTypeEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.clientTypeForm.patchValue({ clientTypeEtat: target.checked ? 1 : 0 });
  }

  addClientType(): void {
    if (this.clientTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Fetch all ClientTypes to determine the max ID
    this.clientTypeService.getAll().subscribe(
      (clientTypes: ClientType[]) => {
        const maxId = clientTypes.reduce((max, c) => c.id > max ? c.id : max, 0);
        const newId = maxId + 1;

        // Create a new ClientType with the new ID
        const clientType: ClientType = { id: newId, ...this.clientTypeForm.value };
        this.clientTypeService.addClientType(clientType).subscribe(
          response => {
            console.log('ClientType ajouté avec succès', response);
            this.snackBar.open('ClientType ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/client-types']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du ClientType', error);
            this.errorMessage = 'Erreur lors de l\'ajout du ClientType';
            this.snackBar.open('Erreur lors de l\'ajout du ClientType', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des ClientTypes', error);
        this.errorMessage = 'Erreur lors de la récupération des ClientTypes';
        this.snackBar.open('Erreur lors de la récupération des ClientTypes', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/client-types']); 
  }
}