import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { DocType } from '../../Models/DocType';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  private apiUrl = 'http://localhost:3000/docTypes'; 

  constructor(private http: HttpClient) {}

 
  getDocumentTypes(): Observable<DocType[]> {
    return this.http.get<DocType[]>(this.apiUrl);
  }

  addDocumentType(documentType: DocType): Observable<DocType> {
    return this.http.post<DocType>(this.apiUrl, documentType);
  }

   updateDocumentType(id: number, documentType: DocType): Observable<DocType> {
    return this.http.put<DocType>(`${this.apiUrl}/${id}`, documentType);
  }

   deleteDocumentType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   getDocumentTypeById(id: number): Observable<DocType> {
    return this.http.get<DocType>(`${this.apiUrl}/${id}`);
  }
  
}
