import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DossierSousCategorieService } from '../../../Services/dossier-sous-categorie.service';
import { DossierSousCategorie } from '../../../../Models/DossierSousCategorie';

@Component({
  selector: 'app-detail-dossier-sous-categorie',
  standalone: true,
  imports: [CommonModule, RouterModule],

  templateUrl: './detail-dossier-sous-categorie.component.html',
  styleUrl: './detail-dossier-sous-categorie.component.scss'
})
export class DetailDossierSousCategorieComponent {
  dossierSousCategorie: DossierSousCategorie | undefined;

  constructor(
    private dossierSousCategorieService: DossierSousCategorieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDossierSousCategorie();
  }

  getDossierSousCategorie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dossierSousCategorieService.getDossierSousCategorieById(id).subscribe(
      (data: DossierSousCategorie) => {
        this.dossierSousCategorie = data;
      },
      (error: any) => {
        console.error('Error fetching dossier sous categorie:', error);
      }
    );
  }
}
