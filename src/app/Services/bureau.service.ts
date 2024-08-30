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

   getBureaux(): Observable<Bureau[]> {
    return this.http.get<Bureau[]>(this.apiUrl);
  }

   getBureauById(id: number): Observable<Bureau> {
    return this.http.get<Bureau>(`${this.apiUrl}/${id}`);
  }

   createBureau(bureau: Bureau): Observable<Bureau> {
    return this.http.post<Bureau>(this.apiUrl, bureau);
  }

   updateBureau(id: number, bureau: Bureau): Observable<Bureau> {
    return this.http.put<Bureau>(`${this.apiUrl}/${id}`, bureau);
  }

   deleteBureau(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   searchBureaux(query: any): Observable<Bureau[]> {
    let params = new HttpParams();
    for (const key in query) {
      if (query[key]) {
        params = params.set(key, query[key]);
      }
    }
    return this.http.get<Bureau[]>(this.apiUrl, { params });
  }}
