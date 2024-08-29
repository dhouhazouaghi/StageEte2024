import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DossierAxe } from '../../../../Models/DossierAxe';
import { DossierAxeService } from '../../../Services/dossier-axe.service';

@Component({
  selector: 'app-dossier-axe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dossier-axe-detail.component.html',
  styleUrl: './dossier-axe-detail.component.scss'
})
export class DossierAxeDetailComponent {
  dossierAxe: DossierAxe | undefined;

  constructor(
    private dossierAxeService: DossierAxeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDossierAxe();
  }

  getDossierAxe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dossierAxeService.getDossierAxeById(id).subscribe(
      (data: DossierAxe) => {
        this.dossierAxe = data;
      },
      (error: any) => {
        console.error('Error fetching dossier axe:', error);
      }
    );
  }
}
