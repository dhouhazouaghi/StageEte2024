import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {  MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfessionnelType } from '../../../../Models/ProfessionnelType';
import { ProfessionnelTypeServiceService } from '../../../Services/professionnel-type-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule], 
  templateUrl: './add-pro.component.html',
  styleUrl: './add-pro.component.scss'
})
export class AddProComponent  {
  proTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private professionnelTypeService: ProfessionnelTypeServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.proTypeForm = this.fb.group({
      professionnelTypeLibelle: ['', Validators.required],
      professionnelTypeLibelleArabe: ['', Validators.required],
      professionnelTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      professionnelTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  addProfessionnelType(): void {
    if (this.proTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.professionnelTypeService.getProfessionnelTypes().subscribe(
      (professionnelTypes: ProfessionnelType[]) => {
        const maxId = professionnelTypes.reduce((max, t) => t.id > max ? t.id : max, 0);
        const newId = maxId + 1;

        const professionnelType: ProfessionnelType = { id: newId, ...this.proTypeForm.value };
        this.professionnelTypeService.addProfessionnelType(professionnelType).subscribe(
          response => {
            console.log('Professionnel Type ajouté avec succès', response);
            this.snackBar.open('Type de professionnel ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/pro-types']);
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du Professionnel Type', error);
            this.errorMessage = 'Erreur lors de l\'ajout du Professionnel Type';
            this.snackBar.open('Erreur lors de l\'ajout du type de professionnel', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des types de professionnel', error);
        this.errorMessage = 'Erreur lors de la récupération des types de professionnel';
        this.snackBar.open('Erreur lors de la récupération des types de professionnel', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/pro-types']);
  }
}
