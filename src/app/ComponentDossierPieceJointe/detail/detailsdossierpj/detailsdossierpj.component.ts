import { Component, OnInit } from '@angular/core';
import { DossierPieceJointe } from '../../../../Models/DossierPieceJointe';
import { DossierPieceJointeService } from '../../../Services/dossier-piece-jointe.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailsdossierpj',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detailsdossierpj.component.html',
  styleUrl: './detailsdossierpj.component.scss'
})
export class DetailsdossierpjComponent implements OnInit {
  dossierPieceJointe: DossierPieceJointe | undefined;

  constructor(
    private dossierPieceJointeService: DossierPieceJointeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDossierPieceJointe();
  }

  getDossierPieceJointe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dossierPieceJointeService.getDossierPieceJointeById(id).subscribe(
      (data: DossierPieceJointe) => {
        this.dossierPieceJointe = data;
      },
      (error: any) => {
        console.error('Error fetching dossier piece jointe:', error);
      }
    );
  }
}