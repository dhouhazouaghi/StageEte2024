import { Injectable } from '@angular/core';
import { PreContentieuxTypeCategorie } from '../../Models/PreContentieuxTypeCategorie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreContentieuxTypeCategorieService {


  private apiUrl = 'http://localhost:3000/preContentieuxTypeCategories';

  constructor(private http: HttpClient) {}

   getPreContentieuxTypeCategories(): Observable<PreContentieuxTypeCategorie[]> {
    return this.http.get<PreContentieuxTypeCategorie[]>(this.apiUrl);
  }

  getPreContentieuxTypeCategorie(id: number): Observable<PreContentieuxTypeCategorie> {
    return this.http.get<PreContentieuxTypeCategorie>(`${this.apiUrl}/${id}`);
  }

   createPreContentieuxTypeCategorie(preContentieuxTypeCategorie: PreContentieuxTypeCategorie): Observable<PreContentieuxTypeCategorie> {
    return this.http.post<PreContentieuxTypeCategorie>(this.apiUrl, preContentieuxTypeCategorie);
  }
  
  updatePreContentieuxTypeCategorie(id: number, notificationMoyen: PreContentieuxTypeCategorie): Observable<PreContentieuxTypeCategorie> {
    return this.http.put<PreContentieuxTypeCategorie>(`${this.apiUrl}/${id}`, notificationMoyen);
  }

   deletePreContentieuxTypeCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }}
