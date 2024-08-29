import { Component, OnInit } from '@angular/core';
import { DocType } from '../../../../Models/DocType';
import { DocumentTypeService } from '../../../Services/document-type.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-type-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './document-type-details.component.html',
  styleUrl: './document-type-details.component.scss'
})
export class DocumentTypeDetailsComponent  {
  documentType: DocType | undefined;

  constructor(
    private documentTypeService: DocumentTypeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDocumentType();
  }

  getDocumentType(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.documentTypeService.getDocumentTypeById(id).subscribe(
      (data: DocType) => {
        this.documentType = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du type de document:', error);
      }
    );
  }
}