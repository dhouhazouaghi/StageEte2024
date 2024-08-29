import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationMoyenServiceService } from '../../../Services/notification-moyen-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationMoyen } from '../../../../Models/NotificationMoyen';

@Component({
  selector: 'app-update-notification-moyen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule , MatInputModule, MatSnackBarModule, RouterModule],

  templateUrl: './update-notification-moyen.component.html',
  styleUrl: './update-notification-moyen.component.scss'
})
export class UpdateNotificationMoyenComponent implements OnInit {
  notificationMoyenForm: FormGroup;
  errorMessage: string = '';
  notificationMoyenId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private notificationMoyenService: NotificationMoyenServiceService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.notificationMoyenId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.notificationMoyenId) {
      this.notificationMoyenService.getNotificationMoyenById(this.notificationMoyenId).subscribe(
        (notificationMoyen: NotificationMoyen) => {
          this.notificationMoyenForm.patchValue(notificationMoyen);
        },
        error => {
          console.error('Erreur lors de la récupération du moyen de notification', error);
          this.errorMessage = 'Erreur lors de la récupération du moyen de notification';
        }
      );
    }
  }

  onEtatChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.notificationMoyenForm.patchValue({ notificationMoyenEtat: target.checked ? 1 : 0 });
  }

  updateNotificationMoyen(): void {
    if (this.notificationMoyenForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.notificationMoyenId !== null) {
      const notificationMoyen: NotificationMoyen = { id: this.notificationMoyenId, ...this.notificationMoyenForm.value };
      this.notificationMoyenService.updateNotificationMoyen(this.notificationMoyenId, notificationMoyen).subscribe(
        response => {
          console.log('NotificationMoyen mis à jour avec succès', response);
          this.snackBar.open('Moyen de notification mis à jour avec succès', 'Fermer', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/notif']);  // Redirection après que le snack bar soit fermé
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour du NotificationMoyen', error);
          this.errorMessage = 'Erreur lors de la mise à jour du NotificationMoyen';
          this.snackBar.open('Erreur lors de la mise à jour du moyen de notification', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/notif']);
  }
}