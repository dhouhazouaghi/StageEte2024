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

  // Get all avocat specialites
  getAvocatSpecialites(): Observable<AvocatSpecialite[]> {
    return this.http.get<AvocatSpecialite[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get an avocat specialite by ID
  getAvocatSpecialiteById(id: number): Observable<AvocatSpecialite> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AvocatSpecialite>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new avocat specialite
  addAvocatSpecialite(specialite: AvocatSpecialite): Observable<AvocatSpecialite> {
    return this.http.post<AvocatSpecialite>(this.apiUrl, specialite).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing avocat specialite
  updateAvocatSpecialite(id: number, specialite: AvocatSpecialite): Observable<AvocatSpecialite> {
    return this.http.put<AvocatSpecialite>(`${this.apiUrl}/${id}`, specialite);
  }
  // Delete an avocat specialite
  deleteAvocatSpecialite(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    // Customize your error handling here
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }}
