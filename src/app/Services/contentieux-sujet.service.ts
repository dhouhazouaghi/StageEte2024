import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContentieuxSujet } from '../../Models/ContentieuxSujet';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentieuxSujetService {
  private apiUrl = 'http://localhost:3000/ContentieuxSujet'; 

  constructor(private http: HttpClient) { }

  // Get all contentieux sujets
  getAllContentieuxSujets(): Observable<ContentieuxSujet[]> {
    return this.http.get<ContentieuxSujet[]>(this.apiUrl);
  }

  // Get a single contentieux sujet by reference
  getContentieuxSujetById(id: number): Observable<ContentieuxSujet> {
    return this.http.get<ContentieuxSujet>(`${this.apiUrl}/${id}`);
  }

  // Add a new contentieux sujet
  addContentieuxSujet(contentieuxSujet: ContentieuxSujet): Observable<ContentieuxSujet> {
    return this.http.post<ContentieuxSujet>(this.apiUrl, contentieuxSujet);
  }

  // Update an existing contentieux sujet
  updateContentieuxSujet(id: number, contentieuxSujet: ContentieuxSujet): Observable<ContentieuxSujet> {
    return this.http.put<ContentieuxSujet>(`${this.apiUrl}/${id}`, contentieuxSujet);
  }

  // Delete a contentieux sujet
  deleteContentieuxSujet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
