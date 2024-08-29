import { Injectable } from '@angular/core';
import { ContentieuxType } from '../../Models/ContentieuxType';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentieuxTypeService {
  private apiUrl = 'http://localhost:3000/contentieuxTypes'; // Adjust URL as needed

  constructor(private http: HttpClient) {}


  // Create a new ContentieuxType
  createContentieuxType(contentieuxType: ContentieuxType): Observable<ContentieuxType> {
    return this.http.post<ContentieuxType>(this.apiUrl, contentieuxType);
  }

  // Get all ContentieuxTypes
  getAllContentieuxType(): Observable<ContentieuxType[]> {
    return this.http.get<ContentieuxType[]>(this.apiUrl);
  }

  // Get a ContentieuxType by ID
  getByIdContentieuxType(id: number): Observable<ContentieuxType> {
    return this.http.get<ContentieuxType>(`${this.apiUrl}/${id}`);
  }

  // Update an existing ContentieuxType
  updateContentieuxType(id: number, contentieuxType: ContentieuxType): Observable<ContentieuxType> {
    return this.http.put<ContentieuxType>(`${this.apiUrl}/${id}`, contentieuxType);
  }

  // Delete a ContentieuxType by ID
  deleteContentieuxType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
