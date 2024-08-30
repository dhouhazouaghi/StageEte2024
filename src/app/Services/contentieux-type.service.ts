import { Injectable } from '@angular/core';
import { ContentieuxType } from '../../Models/ContentieuxType';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentieuxTypeService {
  private apiUrl = 'http://localhost:3000/contentieuxTypes';  

  constructor(private http: HttpClient) {}


   createContentieuxType(contentieuxType: ContentieuxType): Observable<ContentieuxType> {
    return this.http.post<ContentieuxType>(this.apiUrl, contentieuxType);
  }

   getAllContentieuxType(): Observable<ContentieuxType[]> {
    return this.http.get<ContentieuxType[]>(this.apiUrl);
  }

   getByIdContentieuxType(id: number): Observable<ContentieuxType> {
    return this.http.get<ContentieuxType>(`${this.apiUrl}/${id}`);
  }

   updateContentieuxType(id: number, contentieuxType: ContentieuxType): Observable<ContentieuxType> {
    return this.http.put<ContentieuxType>(`${this.apiUrl}/${id}`, contentieuxType);
  }

   deleteContentieuxType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
