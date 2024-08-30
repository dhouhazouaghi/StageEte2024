import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AffaireSens } from '../../Models/AffaireSens';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AffaireSensService {

  private apiUrl = 'http://localhost:3000/affaireSens'; 

  constructor(private http: HttpClient) {}

   createAffaireSens(affaireSens: AffaireSens): Observable<AffaireSens> {
    return this.http.post<AffaireSens>(this.apiUrl, affaireSens)
      .pipe(
        catchError(this.handleError)
      );
  }

   getAffaireSens(): Observable<AffaireSens[]> {
    return this.http.get<AffaireSens[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

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
   deleteAffaireSens(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

   private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }}
