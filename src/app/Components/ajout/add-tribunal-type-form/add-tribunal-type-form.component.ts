import { Component, OnInit } from '@angular/core';
import { TribunalType } from '../../../../Models/TribunalType';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tribunal-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule], // Ajoutez les imports nécessaires ici
  templateUrl: './add-tribunal-type-form.component.html',
  styleUrls: ['./add-tribunal-type-form.component.scss'], // Corrigez ici (styleUrls au lieu de styleUrl)
})
export class AddTribunalTypeFormComponent implements OnInit {
  tribunalTypeForm: FormGroup;
  nextRef: number = 1;

  constructor(
    private fb: FormBuilder,
    private tribunalTypeService: TribunalService,
    private snackBar: MatSnackBar
  ) {
    this.tribunalTypeForm = this.fb.group({
      tribunalTypeLibelle: ['', Validators.required],
      tribunalTypeLibelleArabe: ['', Validators.required],
      tribunalTypeDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      tribunalTypeDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      tribunalTypeEtat: [false]
    });
  }

  ngOnInit(): void {
    this.tribunalTypeService.getTribunalTypes().subscribe(types => {
      if (types.length > 0) {
        this.nextRef = Math.max(...types.map(t => t.tribunalTypeRef)) + 1;
      }
    });
  }

  submitForm() {
    if (this.tribunalTypeForm.valid) {
      const newTribunalType: TribunalType = {
        tribunalTypeRef: this.nextRef++,  // Assign the next ID
        tribunalTypeLibelle: this.tribunalTypeForm.value.tribunalTypeLibelle,
        tribunalTypeLibelleArabe: this.tribunalTypeForm.value.tribunalTypeLibelleArabe,
        tribunalTypeDescription: this.tribunalTypeForm.value.tribunalTypeDescription,
        tribunalTypeDescriptionArabe: this.tribunalTypeForm.value.tribunalTypeDescriptionArabe,
        tribunalTypeEtat: this.tribunalTypeForm.value.tribunalTypeEtat ? 1 : 0  // Convert boolean to 0 or 1
      };

      this.tribunalTypeService.addTribunalType(newTribunalType).subscribe((createdTribunalType: TribunalType) => {
        console.log('Tribunal Type added:', createdTribunalType);
        this.tribunalTypeForm.reset();
        this.snackBar.open('Tribunal Type added successfully!', 'Close', {
          duration: 3000,  // Duration in milliseconds
        });
      });
    }
  }
}
