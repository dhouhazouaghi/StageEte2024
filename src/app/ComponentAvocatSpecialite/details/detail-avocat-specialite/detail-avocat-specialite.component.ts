import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AvocatSpecialite } from '../../../../Models/AvocatSpecialite';
import { AvocatSpecialiteService } from '../../../Services/avocat-specialite.service';

@Component({
  selector: 'app-detail-avocat-specialite',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './detail-avocat-specialite.component.html',
  styleUrl: './detail-avocat-specialite.component.scss'
})
export class DetailAvocatSpecialiteComponent {
  avocatSpecialite: AvocatSpecialite | undefined;

  constructor(
    private avocatSpecialiteService: AvocatSpecialiteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAvocatSpecialite();
  }

  getAvocatSpecialite(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.avocatSpecialiteService.getAvocatSpecialiteById(id).subscribe(
      (data: AvocatSpecialite) => {
        this.avocatSpecialite = data;
      },
      (error: any) => {
        console.error('Error fetching avocat specialite:', error);
      }
    );
  }
}
