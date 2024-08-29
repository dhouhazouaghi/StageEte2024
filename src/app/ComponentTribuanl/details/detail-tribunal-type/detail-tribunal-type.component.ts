import { Component } from '@angular/core';
import { TribunalTypeService } from '../../../Services/tribunal-type.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TribunalType } from '../../../../Models/Tribunal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-tribunal-type',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './detail-tribunal-type.component.html',
  styleUrl: './detail-tribunal-type.component.scss'
})
export class DetailTribunalTypeComponent {
  tribunalType: TribunalType | undefined;

  constructor(
    private tribunalTypeService: TribunalTypeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTribunalType();
  }

  getTribunalType(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tribunalTypeService.getTribunalTypeById(id).subscribe(
      (data: TribunalType) => {
        this.tribunalType = data;
      },
      (error: any) => {
        console.error('Error fetching tribunal type:', error);
      }
    );
  }
}
