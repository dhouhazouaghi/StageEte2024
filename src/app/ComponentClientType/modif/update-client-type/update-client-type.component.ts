import { Component, OnInit } from '@angular/core';
import { ClientTypeService } from '../../../Services/client-type.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientType } from '../../../../Models/clientType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-client-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],

  templateUrl: './update-client-type.component.html',
  styleUrl: './update-client-type.component.scss'
})
export class UpdateClientTypeComponent implements OnInit {
  clientTypeForm: FormGroup;
  errorMessage: string = '';
  id!: number;

  constructor(
    private fb: FormBuilder,
    private clientTypeService: ClientTypeService,
    private route: ActivatedRoute ,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.clientTypeForm = this.fb.group({
      clientTypeLibelle: ['', Validators.required],
      clientTypeLibelleArabe: ['', Validators.required],
      clientTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadClientType();
  }

  loadClientType(): void {
    this.clientTypeService.getClientTypeById(this.id).subscribe(
      (clientType: ClientType) => {
        this.clientTypeForm.patchValue({
          clientTypeLibelle: clientType.clientTypeLibelle,
          clientTypeLibelleArabe: clientType.clientTypeLibelleArabe,
          clientTypeEtat: clientType.clientTypeEtat
        });
      },
      error => {
        console.error('Erreur lors de la récupération du Type Client', error);
        this.errorMessage = 'Erreur lors de la récupération du Type Client';
      }
    );
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.clientTypeForm.patchValue({ clientTypeEtat: target.checked ? 1 : 0 });
  }

  updateClientType(): void {
    if (this.clientTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const updatedClientType: ClientType = {
      id: this.id,
      ...this.clientTypeForm.value
    };

    this.clientTypeService.updateClientType(this.id, updatedClientType).subscribe(
      response => {
        console.log('Type Client mis à jour avec succès', response);
        this.snackBar.open('Type Client mis à jour avec succès', 'Fermer', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/client-types']);    
        });
      },
      error => {
        console.error('Erreur lors de la mise à jour du Type Client', error);
        this.errorMessage = 'Erreur lors de la mise à jour du Type Client';
        this.snackBar.open('Erreur lors de la mise à jour du Type Client', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/client-types']);
  }
}