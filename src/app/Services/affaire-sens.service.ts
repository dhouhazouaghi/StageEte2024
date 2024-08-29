import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AffaireSens } from '../../Models/AffaireSens';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AffaireSensService {

  private apiUrl = 'http://localhost:3000/affaireSens'; // URL to your JSON Server or API

  constructor(private http: HttpClient) {}

  // Create a new AffaireSens
  createAffaireSens(affaireSens: AffaireSens): Observable<AffaireSens> {
    return this.http.post<AffaireSens>(this.apiUrl, affaireSens)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Read all AffaireSens
  getAffaireSens(): Observable<AffaireSens[]> {
    return this.http.get<AffaireSens[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Read an AffaireSens by ID
  getAffaireSensById(id: number): Observable<AffaireSens> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AffaireSens>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateAffaireSens(id: number, affaireSens: AffaireSens): Observable<AffaireSens> {
    return this.http.put<AffaireSens>(`${this.apiUrl}/${id}`, affaireSens);
  }
  // Delete an AffaireSens by ID
  deleteAffaireSens(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }}
