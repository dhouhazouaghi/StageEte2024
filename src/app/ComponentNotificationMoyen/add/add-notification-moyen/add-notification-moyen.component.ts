import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationMoyenServiceService } from '../../../Services/notification-moyen-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NotificationMoyen } from '../../../../Models/NotificationMoyen';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-notification-moyen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],

  templateUrl: './add-notification-moyen.component.html',
  styleUrl: './add-notification-moyen.component.scss'
})
export class AddNotificationMoyenComponent {
  notificationMoyenForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private notificationMoyenService: NotificationMoyenServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.notificationMoyenForm = this.fb.group({
      notificationMoyenLibelle: ['', Validators.required],
      notificationMoyenLibelleArabe: ['', Validators.required],
      notificationMoyenDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      notificationMoyenDescriptionArabe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      notificationMoyenEtat: [0]
    });
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.notificationMoyenForm.patchValue({ notificationMoyenEtat: target.checked ? 1 : 0 });
  }

  addNotificationMoyen(): void {
    if (this.notificationMoyenForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
  
    // Fetch all NotificationMoyens to determine the max ID
    this.notificationMoyenService.getNotificationMoyens().subscribe(
      (notificationMoyens: NotificationMoyen[]) => {
        const maxId = notificationMoyens.reduce((max, n) => n.id > max ? n.id : max, 0);
        const newId = maxId + 1;

        // Create a new NotificationMoyen with the new ID
        const notificationMoyen: NotificationMoyen = { id: newId, ...this.notificationMoyenForm.value };
        this.notificationMoyenService.addNotificationMoyen(notificationMoyen).subscribe(
          response => {
            console.log('NotificationMoyen ajouté avec succès', response);
            this.snackBar.open('Moyen de notification ajouté avec succès', 'Fermer', {
              duration: 3000,
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/notif']);  // Redirect after the snack bar is closed
            });
          },
          error => {
            console.error('Erreur lors de l\'ajout du NotificationMoyen', error);
            this.errorMessage = 'Erreur lors de l\'ajout du NotificationMoyen';
            this.snackBar.open('Erreur lors de l\'ajout du moyen de notification', 'Fermer', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération des moyens de notification', error);
        this.errorMessage = 'Erreur lors de la récupération des moyens de notification';
        this.snackBar.open('Erreur lors de la récupération des moyens de notification', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  onCancel() {
    this.router.navigate(['/notif']); 
  }
}