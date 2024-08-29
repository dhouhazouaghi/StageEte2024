import { Component, OnInit } from '@angular/core';
import { TribunalType } from '../../../../Models/TribunalType';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TribunalTypeServicesService } from '../../../NewServices/tribunal-type-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tribunal-type-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './tribunal-type-details.component.html',
  styleUrl: './tribunal-type-details.component.scss'
})
export class TribunalTypeDetailsComponent implements OnInit {
  tribunalType: TribunalType | undefined;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private tribunalTypeService: TribunalTypeServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTribunalType();
  }

  getTribunalType(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.tribunalTypeService.getTribunalTypeById(id).subscribe(
        (data: TribunalType) => {
          this.tribunalType = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du TribunalType', error);
          this.errorMessage = 'Erreur lors de la récupération des détails du TribunalType';
        }
      );
    }
  }
}
