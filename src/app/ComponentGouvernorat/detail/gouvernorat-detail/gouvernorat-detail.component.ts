import { Component, OnInit } from '@angular/core';
import { Gouvernorat } from '../../../../Models/Gouvernorat';
import { GouvernoratService } from '../../../Services/gouvernorat.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gouvernorat-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './gouvernorat-detail.component.html',
  styleUrl: './gouvernorat-detail.component.scss'
})
export class GouvernoratDetailComponent  {
  gouvernorat: Gouvernorat | undefined;

  constructor(
    private gouvernoratService: GouvernoratService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getGouvernorat();
  }

  getGouvernorat(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gouvernoratService.getGouvernoratById(id).subscribe(
      (data: Gouvernorat) => {
        this.gouvernorat = data;
      },
      (error: any) => {
        console.error('Error fetching gouvernorat:', error);
      }
    );
  }
}