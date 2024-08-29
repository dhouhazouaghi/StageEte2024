import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BureauType } from '../../Models/BureauType';

@Injectable({
  providedIn: 'root'
})
export class BureauTypeService {

  private apiUrl = 'http://localhost:3000/bureauTypes'; 
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all BureauTypes
  getBureauTypes(): Observable<BureauType[]> {
    return this.http.get<BureauType[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get a BureauType by ID
  getBureauTypeById(bureauTypeRef: number): Observable<BureauType> {
    return this.http.get<BureauType>(`${this.apiUrl}/${bureauTypeRef}`)
      .pipe(catchError(this.handleError));
  }

  // Add a new BureauType
  addBureauType(bureauType: BureauType): Observable<BureauType> {
    return this.http.post<BureauType>(this.apiUrl, bureauType, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update an existing BureauType
  updateBureauType(bureauTypeRef: number, bureauType: BureauType): Observable<BureauType> {
    return this.http.put<BureauType>(`${this.apiUrl}/${bureauTypeRef}`, bureauType, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete a BureauType
  deleteBureauType(bureauTypeRef: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bureauTypeRef}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // For debugging purposes
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
