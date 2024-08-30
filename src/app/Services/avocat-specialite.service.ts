import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvocatSpecialite } from '../../Models/AvocatSpecialite';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvocatSpecialiteService {
  private apiUrl = 'http://localhost:3000/AvocatSpecialites';

  constructor(private http: HttpClient) { }

   getAvocatSpecialites(): Observable<AvocatSpecialite[]> {
    return this.http.get<AvocatSpecialite[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

   getAvocatSpecialiteById(id: number): Observable<AvocatSpecialite> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AvocatSpecialite>(url).pipe(
      catchError(this.handleError)
    );
  }

   addAvocatSpecialite(specialite: AvocatSpecialite): Observable<AvocatSpecialite> {
    return this.http.post<AvocatSpecialite>(this.apiUrl, specialite).pipe(
      catchError(this.handleError)
    );
  }

   updateAvocatSpecialite(id: number, specialite: AvocatSpecialite): Observable<AvocatSpecialite> {
    return this.http.put<AvocatSpecialite>(`${this.apiUrl}/${id}`, specialite);
  }
   deleteAvocatSpecialite(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

   private handleError(error: HttpErrorResponse) {
     console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }}
