import { Component, OnInit } from '@angular/core';
import { ContentieuxType } from '../../../../Models/ContentieuxType';
import { ContentieuxTypeService } from '../../../Services/contentieux-type.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contentieux-type-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './contentieux-type-detail.component.html',
  styleUrl: './contentieux-type-detail.component.scss'
})
export class ContentieuxTypeDetailComponent{
  contentieuxType: ContentieuxType | undefined;

constructor(
  private contentieuxTypeService: ContentieuxTypeService,
  private route: ActivatedRoute
) {}

ngOnInit(): void {
  this.getTribunalType();
}

getTribunalType(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.contentieuxTypeService.getByIdContentieuxType(id).subscribe(
    (data: ContentieuxType) => {
      this.contentieuxType = data;
    },
    (error: any) => {
      console.error('Error fetching contentieux type:', error);
    }
  );
}
}