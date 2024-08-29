import { Component, OnInit } from '@angular/core';
import { AffaireSens } from '../../../../Models/AffaireSens';
import { AffaireSensService } from '../../../Services/affaire-sens.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-affaire-sens',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './detail-affaire-sens.component.html',
  styleUrl: './detail-affaire-sens.component.scss'
})
export class DetailAffaireSensComponent implements OnInit {
  affaireSens: AffaireSens | undefined;

  constructor(
    private affaireSensService: AffaireSensService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAffaireSens();
  }

  getAffaireSens(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.affaireSensService.getAffaireSensById(id).subscribe(
      (data: AffaireSens) => {
        this.affaireSens = data;
      },
      (error: any) => {
        console.error('Error fetching affaire sens:', error);
      }
    );
  }
}