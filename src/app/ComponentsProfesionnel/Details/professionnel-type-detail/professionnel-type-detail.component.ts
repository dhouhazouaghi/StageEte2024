import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfessionnelType } from '../../../../Models/ProfessionnelType';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProfessionnelTypeServiceService } from '../../../Services/professionnel-type-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professionnel-type-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './professionnel-type-detail.component.html',
  styleUrl: './professionnel-type-detail.component.scss'
})
export class ProfessionnelTypeDetailComponent implements OnInit {
  professionnelType : ProfessionnelType | undefined;

  constructor(
    private professionnelTypeService: ProfessionnelTypeServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTribunalType();
  }

  getTribunalType(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.professionnelTypeService.getProfessionnelTypeById(id).subscribe(
      (data: ProfessionnelType) => {
        this.professionnelType = data;
      },
      (error: any) => {
        console.error('Error fetching professionnel type:', error);
      }
    );
  }
}