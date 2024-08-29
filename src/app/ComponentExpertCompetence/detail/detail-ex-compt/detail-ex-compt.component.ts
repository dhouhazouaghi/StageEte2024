import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExpertCompetenceService } from '../../../Services/expert-competence.service';
import { ExpertCompetence } from '../../../../Models/ExpertCompetence';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-ex-compt',
  standalone: true,
  imports: [CommonModule, RouterModule],

  templateUrl: './detail-ex-compt.component.html',
  styleUrl: './detail-ex-compt.component.scss'
})
export class DetailExComptComponent implements OnInit {
  expertCompetence: ExpertCompetence | undefined;

  constructor(
    private expertCompetenceService: ExpertCompetenceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getExpertCompetence(); // Update the method call
  }

  getExpertCompetence(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.expertCompetenceService.getExpertCompetenceById(id).subscribe(
      (data: ExpertCompetence) => {
        this.expertCompetence = data;
      },
      (error: any) => {
        console.error('Error fetching expert competence:', error);
      }
    );
  }
}