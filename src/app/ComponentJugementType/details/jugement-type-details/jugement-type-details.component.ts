import { Component, OnInit } from '@angular/core';
import { JugementType } from '../../../../Models/JugementType';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JugementTypeService } from '../../../Services/jugement-type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugement-type-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './jugement-type-details.component.html',
  styleUrl: './jugement-type-details.component.scss'
})
export class JugementTypeDetailsComponent  implements OnInit {
  jugementType: JugementType | undefined;

  constructor(
    private jugementTypeService: JugementTypeService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getJugementType(); // Update the method call
  }

  getJugementType(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jugementTypeService.getJugementTypeById(id).subscribe(
      (data: JugementType) => {
        this.jugementType = data;
      },
      (error: any) => {
        console.error('Error fetching jugement type:', error);
      }
    );
  }
}