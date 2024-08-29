import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PreContentieuxTypeService } from '../../../Services/pre-contentieux-type.service';
import { PreContentieuxType } from '../../../../Models/PreContentieuxType';

@Component({
  selector: 'app-detail-pre-contentieux-type',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-pre-contentieux-type.component.html',
  styleUrl: './detail-pre-contentieux-type.component.scss'
})
export class DetailPreContentieuxTypeComponent {
  preContentieuxType: PreContentieuxType | undefined;

  constructor(
    private preContentieuxTypeService: PreContentieuxTypeService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.getPreContentieuxType();
  }

  getPreContentieuxType(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.preContentieuxTypeService.getPreContentieuxTypeById(id).subscribe(
      (data: PreContentieuxType) => {
        this.preContentieuxType = data;
      },
      (error: any) => {
        console.error('Error fetching pre-contentieux type:', error);
      }
    );
  }
}
