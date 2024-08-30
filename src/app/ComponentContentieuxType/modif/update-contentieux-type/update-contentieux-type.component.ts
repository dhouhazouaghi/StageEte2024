import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentieuxTypeService } from '../../../Services/contentieux-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentieuxType } from '../../../../Models/ContentieuxType';

@Component({
  selector: 'app-update-contentieux-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule ],

  templateUrl: './update-contentieux-type.component.html',
  styleUrl: './update-contentieux-type.component.scss'
})
export class UpdateContentieuxTypeComponent implements OnInit { 
  contentieuxTypeForm: FormGroup; 
  errorMessage: string = '';
  contentieuxTypeId: number | null = null;  

  constructor(
    private fb: FormBuilder,
    private contentieuxTypeService: ContentieuxTypeService,  
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.contentieuxTypeForm = this.fb.group({
      contentieuxTypeLibelle: ['', Validators.required],
      contentieuxTypeLibelleArabe: ['', Validators.required],
      contentieuxTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      contentieuxTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      contentieuxTypeEtat: [0]
    });
  }

  ngOnInit(): void {
    this.contentieuxTypeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.contentieuxTypeId) {
      this.contentieuxTypeService.getByIdContentieuxType(this.contentieuxTypeId).subscribe(
        (contentieuxType: ContentieuxType) => {
          this.contentieuxTypeForm.patchValue(contentieuxType);
        },
        error => {
          console.error('Erreur lors de la récupération du type de contentieux', error);
          this.errorMessage = 'Erreur lors de la récupération du type de contentieux';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.contentieuxTypeForm.patchValue({ contentieuxTypeEtat: target.checked ? 1 : 0 });
  }

  updateContentieuxType(): void {  
    if (this.contentieuxTypeForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.contentieuxTypeId !== null) {
      const contentieuxType: ContentieuxType = { id: this.contentieuxTypeId, ...this.contentieuxTypeForm.value };
      this.contentieuxTypeService.updateContentieuxType(this.contentieuxTypeId, contentieuxType).subscribe(  
        response => {
          console.log('ContentieuxType mis à jour avec succès', response);
          this.snackBar.open('Type de contentieux mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/list']);    
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du ContentieuxType', error);
          this.errorMessage = 'Erreur lors de la mise à jour du ContentieuxType';
          this.snackBar.open('Erreur lors de la mise à jour du type de contentieux', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/list']); 
  }
}
