import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EtatService } from '../../../Services/etat.service';
import { Etat } from '../../../../Models/Etat';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etat-detail',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './etat-detail.component.html',
  styleUrl: './etat-detail.component.scss'
})
export class EtatDetailComponent  {
  etat: Etat | undefined;

  constructor(
    private etatService: EtatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEtat();
  }

  getEtat(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.etatService.getEtatById(id).subscribe(
      (data: Etat) => {
        this.etat = data;
      },
      (error: any) => {
        console.error('Error fetching Etat:', error);
      }
    );
  }
}