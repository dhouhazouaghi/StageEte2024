import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DossierCategorieServiceService } from '../../../Services/dossier-categorie-service.service';
import { DossierCategorie } from '../../../../Models/DossierCategorie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-doss-categ',
  standalone: true,
  imports: [CommonModule, RouterModule],

  templateUrl: './detail-doss-categ.component.html',
  styleUrl: './detail-doss-categ.component.scss'
})
export class DetailDossCategComponent implements OnInit {
  dossierCategorie: DossierCategorie | undefined;

  constructor(
    private dossierCategorieService: DossierCategorieServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDossierCategorie();
  }

  getDossierCategorie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dossierCategorieService.getDossierCategorieById(id).subscribe(
      (data: DossierCategorie) => {
        this.dossierCategorie = data;
      },
      (error: any) => {
        console.error('Error fetching dossier category:', error);
      }
    );
  }
}
