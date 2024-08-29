import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BureauService } from '../../../Services/bureau.service';
import { Bureau } from '../../../../Models/Bureau';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-bureau',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-bureau.component.html',
  styleUrl: './detail-bureau.component.scss'
})
export class DetailBureauComponent {
  bureau: Bureau | undefined;

  constructor(
    private bureauService: BureauService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBureau();
  }

  getBureau(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bureauService.getBureauById(id).subscribe(
      (data: Bureau) => {
        this.bureau = data;
      },
      (error: any) => {
        console.error('Error fetching bureau:', error);
      }
    );
  }
}
