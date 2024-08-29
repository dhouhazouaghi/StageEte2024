import { Component, OnInit } from '@angular/core';
import { Etablissement } from '../../../../Models/Etablissement';
import { EtablissementServiceService } from '../../../Services/etablissement-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-etablissement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-etablissement.component.html',
  styleUrl: './detail-etablissement.component.scss'
})
export class DetailEtablissementComponent implements OnInit {
  etablissement: Etablissement | undefined;
  constructor(
    private etablissementService: EtablissementServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEtablissement();
  }

  getEtablissement(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.etablissementService.getEtablissementById(id).subscribe(
      (data: Etablissement) => {
        this.etablissement = data;
      },
      (error: any) => {
        console.error('Error fetching etablissement:', error);
      }
    );
  }
}