import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BureauService } from '../../../Services/bureau.service';
import { Router } from '@angular/router';
import { Bureau } from '../../../../Models/Bureau';

@Component({
  selector: 'app-add-bureau',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule],
  templateUrl: './add-bureau.component.html',
  styleUrl: './add-bureau.component.scss'
})
export class AddBureauComponent {
  bureauForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private bureauService: BureauService ,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bureauForm = this.fb.group({
      bureauRaisonSocial: ['', Validators.required],
      bureauRaisonSocialArabe: ['', Validators.required],
      bureauPersonneContact: ['', Validators.required],
      bureauPersonneContactArabe: ['', Validators.required],
      bureauTelephone: ['', Validators.required],
      bureauGsm: ['', Validators.required],
      bureauFax: [''],
      bureauAdresse: ['', Validators.required],
      bureauAdresseArabe: ['', Validators.required],
      bureauCodePostal: ['', Validators.required],
      bureauEmail: ['', [Validators.required, Validators.email]],
    });
  }

  addBureau(): void {
    if (this.bureauForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.bureauService.getBureaux().subscribe(
      (bureaus: Bureau[]) => {
        const maxId = bureaus.reduce((max, b) => b.id > max ? b.id : max, 0);
        const newId = maxId + 1;

        // Create a new Bureau with the new ID
        const bureau: Bureau = { id: newId, ...this.bureauForm.value };
        this.bureauService.createBureau(bureau).subscribe(
          response => {
            console.log('Bureau ajouté avec succès', response);
            this.snackBar.open('Bureau ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/BureauList']); 
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du Bureau', error);
            this.errorMessage = 'Erreur lors de l\'ajout du Bureau';
            this.snackBar.open('Erreur lors de l\'ajout du bureau', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des bureaux', error);
        this.errorMessage = 'Erreur lors de la récupération des bureaux';
        this.snackBar.open('Erreur lors de la récupération des bureaux', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
  
  onCancel() {
    this.router.navigate(['/BureauList']); 
  }
}
