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

   getAllContentieuxSujets(): Observable<ContentieuxSujet[]> {
    return this.http.get<ContentieuxSujet[]>(this.apiUrl);
  }

   getContentieuxSujetById(id: number): Observable<ContentieuxSujet> {
    return this.http.get<ContentieuxSujet>(`${this.apiUrl}/${id}`);
  }

   addContentieuxSujet(contentieuxSujet: ContentieuxSujet): Observable<ContentieuxSujet> {
    return this.http.post<ContentieuxSujet>(this.apiUrl, contentieuxSujet);
  }

   updateContentieuxSujet(id: number, contentieuxSujet: ContentieuxSujet): Observable<ContentieuxSujet> {
    return this.http.put<ContentieuxSujet>(`${this.apiUrl}/${id}`, contentieuxSujet);
  }

   deleteContentieuxSujet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
