import { Component } from '@angular/core';
import { BureauSpecialite } from '../../../../Models/BureauSpecialite';
import { BureauSpecialiteService } from '../../../Services/bureau-specialite.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-bureau-specialite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-bureau-specialite.component.html',
  styleUrl: './detail-bureau-specialite.component.scss'
})
export class DetailBureauSpecialiteComponent {
  bureauSpecialite: BureauSpecialite | undefined;

  constructor(
    private bureauSpecialiteService: BureauSpecialiteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBureauSpecialite();
  }

  getBureauSpecialite(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bureauSpecialiteService.getBureauSpecialiteById(id).subscribe(
      (data: BureauSpecialite) => {
        this.bureauSpecialite = data;
      },
      (error: any) => {
        console.error('Error fetching bureau specialite:', error);
      }
    );
  }
}
