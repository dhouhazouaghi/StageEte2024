import { Injectable } from '@angular/core';
import { Bureau } from '../../Models/Bureau';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BureauService {
  private apiUrl = 'http://localhost:3000/Bureau'; 


  constructor(private http: HttpClient) { }

  // Get all bureaux
  getBureaux(): Observable<Bureau[]> {
    return this.http.get<Bureau[]>(this.apiUrl);
  }

  // Get a bureau by ID
  getBureauById(id: number): Observable<Bureau> {
    return this.http.get<Bureau>(`${this.apiUrl}/${id}`);
  }

  // Create a new bureau
  createBureau(bureau: Bureau): Observable<Bureau> {
    return this.http.post<Bureau>(this.apiUrl, bureau);
  }

  // Update an existing bureau
  updateBureau(id: number, bureau: Bureau): Observable<Bureau> {
    return this.http.put<Bureau>(`${this.apiUrl}/${id}`, bureau);
  }

  // Delete a bureau
  deleteBureau(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search bureaux by fields
  searchBureaux(query: any): Observable<Bureau[]> {
    let params = new HttpParams();
    for (const key in query) {
      if (query[key]) {
        params = params.set(key, query[key]);
      }
    }
    return this.http.get<Bureau[]>(this.apiUrl, { params });
  }}
