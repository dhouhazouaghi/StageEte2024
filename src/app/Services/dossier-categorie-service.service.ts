import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DossierCategorie } from '../../Models/DossierCategorie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierCategorieServiceService {
  private apiUrl = 'http://localhost:3000/dossierCategories'; 

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getDossierCategories(): Observable<DossierCategorie[]> {
    return this.http.get<DossierCategorie[]>(this.apiUrl);
  }

  getDossierCategorieById(id: number): Observable<DossierCategorie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DossierCategorie>(url);
  }

  addDossierCategorie(dossierCategorie: DossierCategorie): Observable<DossierCategorie> {
    return this.http.post<DossierCategorie>(this.apiUrl, dossierCategorie, this.httpOptions);
  }

  updateDossierCategorie(id: number, dossierCategorie: DossierCategorie): Observable<DossierCategorie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<DossierCategorie>(url, dossierCategorie, this.httpOptions);
  }

  deleteDossierCategorie(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
