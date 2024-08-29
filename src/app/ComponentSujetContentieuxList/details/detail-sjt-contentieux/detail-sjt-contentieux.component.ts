import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContentieuxSujetService } from '../../../Services/contentieux-sujet.service';
import { ContentieuxSujet } from '../../../../Models/ContentieuxSujet';

@Component({
  selector: 'app-detail-sjt-contentieux',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './detail-sjt-contentieux.component.html',
  styleUrl: './detail-sjt-contentieux.component.scss'
})
export class DetailSjtContentieuxComponent {
  contentieuxSujet: ContentieuxSujet | undefined;

  constructor(
    private contentieuxSujetService: ContentieuxSujetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getContentieuxSujet();
  }

  getContentieuxSujet(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contentieuxSujetService.getContentieuxSujetById(id).subscribe(
      (data: ContentieuxSujet) => {
        this.contentieuxSujet = data;
      },
      (error: any) => {
        console.error('Error fetching contentieux sujet:', error);
      }
    );
  }
}
