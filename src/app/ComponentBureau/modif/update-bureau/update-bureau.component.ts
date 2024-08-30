import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauService } from '../../../Services/bureau.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Bureau } from '../../../../Models/Bureau';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-bureau',
  standalone: true,
  imports: [CommonModule, FormsModule , ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule],

  templateUrl: './update-bureau.component.html',
  styleUrl: './update-bureau.component.scss'
})
export class UpdateBureauComponent implements OnInit {
  bureauForm: FormGroup;
  errorMessage: string = '';
  bureauId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bureauService: BureauService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.bureauId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bureauId) {
      this.bureauService.getBureauById(this.bureauId).subscribe(
        (bureau: Bureau) => {
          this.bureauForm.patchValue(bureau);
        },
        error => {
          console.error('Erreur lors de la récupération du bureau', error);
          this.errorMessage = 'Erreur lors de la récupération du bureau';
        }
      );
    }
  }

  updateBureau(): void {
    if (this.bureauForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.bureauId !== null) {
      const bureau: Bureau = { id: this.bureauId, ...this.bureauForm.value };
      this.bureauService.updateBureau(this.bureauId, bureau).subscribe(
        response => {
          console.log('Bureau mis à jour avec succès', response);
          this.snackBar.open('Bureau mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/BureauList']);  
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du Bureau', error);
          this.errorMessage = 'Erreur lors de la mise à jour du Bureau';
          this.snackBar.open('Erreur lors de la mise à jour du bureau', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/BureauList']);
  }
}