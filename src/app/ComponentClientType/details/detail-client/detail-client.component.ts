import { Component, OnInit } from '@angular/core';
import { ClientType } from '../../../../Models/clientType';
import { ClientTypeService } from '../../../Services/client-type.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent  implements OnInit {

    clientType: ClientType | null = null;
    errorMessage: string = '';
  
    constructor(
      private clientTypeService: ClientTypeService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar
    ) {}
  
    ngOnInit(): void {
      this.loadClientType();
    }
  
    loadClientType(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (isNaN(id)) {
        this.errorMessage = 'Invalid client type ID';
        return;
      }
  
      this.clientTypeService.getClientTypeById(id).subscribe(
        (data) => {
          this.clientType = data;
        },
        (error) => {
          console.error('Error loading client type', error);
          this.errorMessage = 'Error loading client type';
          this.snackBar.open('Erreur lors du chargement du type de client', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  
    goBack(): void {
      this.router.navigate(['/client-types']);
    }
}
