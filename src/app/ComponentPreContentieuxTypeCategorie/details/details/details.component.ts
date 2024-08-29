import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PreContentieuxTypeCategorie } from '../../../../Models/PreContentieuxTypeCategorie';
import { PreContentieuxTypeCategorieService } from '../../../Services/pre-contentieux-type-categorie.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],

  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  preContentieuxTypeCategorie: PreContentieuxTypeCategorie | undefined;

  constructor(
    private preContentieuxTypeCategorieService: PreContentieuxTypeCategorieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPreContentieuxTypeCategorie();
  }

  getPreContentieuxTypeCategorie(): void {
    const id= Number(this.route.snapshot.paramMap.get('id'));
    this.preContentieuxTypeCategorieService.getPreContentieuxTypeCategorie(id).subscribe(
      (data: PreContentieuxTypeCategorie) => {
        this.preContentieuxTypeCategorie = data;
      },
      (error: any) => {
        console.error('Error fetching pre-contentieux type catégorie:', error);
      }
    );
  }
}
