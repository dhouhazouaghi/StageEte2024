import { Component, OnInit } from '@angular/core';
import { BureauTypeService } from '../../../Services/bureau-type.service';
import { BureauType } from '../../../../Models/BureauType';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-bureau-type',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-bureau-type.component.html',
  styleUrl: './detail-bureau-type.component.scss'
})
export class DetailBureauTypeComponent implements OnInit {
  bureauType: BureauType | undefined;

  constructor(
    private bureauTypeService: BureauTypeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBureauType();
  }

  getBureauType(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bureauTypeService.getBureauTypeById(id).subscribe(
      (data: BureauType) => {
        this.bureauType = data;
      },
      (error: any) => {
        console.error('Error fetching bureau type:', error);
      }
    );
  }
}
