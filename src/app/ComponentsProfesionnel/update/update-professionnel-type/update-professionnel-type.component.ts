import { Component, OnInit } from '@angular/core';
import { ProfessionnelType } from '../../../../Models/ProfessionnelType';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessionnelTypeServiceService } from '../../../Services/professionnel-type-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-professionnel-type',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './update-professionnel-type.component.html',
  styleUrl: './update-professionnel-type.component.scss'
})
export class UpdateProfessionnelTypeComponent implements OnInit {
 
  proTypeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private professionnelTypeService: ProfessionnelTypeServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.proTypeForm = this.fb.group({
      professionnelTypeLibelle: ['', Validators.required],
      professionnelTypeLibelleArabe: ['', Validators.required],
      professionnelTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      professionnelTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Get the ID from the route parameters
    this.professionnelTypeService.getProfessionnelTypeById(id).subscribe(
      (professionnelType: ProfessionnelType) => {
        this.proTypeForm.patchValue(professionnelType); // Populate the form with existing data
      },
      error => {
        console.error('Erreur lors de la récupération du type de professionnel', error);
        this.errorMessage = 'Erreur lors de la récupération des informations du type de professionnel';
      }
    );
  }

  updateProfessionnelType(): void {
    if (this.proTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const id = +this.route.snapshot.paramMap.get('id')!;
    const updatedProfessionnelType: ProfessionnelType = { id, ...this.proTypeForm.value };
    
    this.professionnelTypeService.updateProfessionnelType(id, updatedProfessionnelType).subscribe(
      response => {
        console.log('Type de professionnel mis à jour avec succès', response);
        this.router.navigate(['/pro-types']);  // Redirect after successful update
      },
      error => {
        console.error('Erreur lors de la mise à jour du type de professionnel', error);
        this.errorMessage = 'Erreur lors de la mise à jour du type de professionnel';
      }
    );
  }

  onCancel() {
    this.router.navigate(['/pro-types']);
  }
 
}