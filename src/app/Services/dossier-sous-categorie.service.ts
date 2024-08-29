import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DossierSousCategorie } from '../../Models/DossierSousCategorie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierSousCategorieService {

  private apiUrl = 'http://localhost:3000/dossierSousCategories'; 

  constructor(private http: HttpClient) {}

  getDossierSousCategories(): Observable<DossierSousCategorie[]> {
    return this.http.get<DossierSousCategorie[]>(this.apiUrl);
  }

  getDossierSousCategorieById(id: number): Observable<DossierSousCategorie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DossierSousCategorie>(url);
  }

  addDossierSousCategorie(dossierSousCategorie: DossierSousCategorie): Observable<DossierSousCategorie> {
    return this.http.post<DossierSousCategorie>(this.apiUrl, dossierSousCategorie, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateDossierSousCategorie(id: number, dossierSousCategorie: DossierSousCategorie): Observable<DossierSousCategorie> {
    return this.http.put<DossierSousCategorie>(`${this.apiUrl}/${id}`, dossierSousCategorie)
  
  }

  deleteDossierSousCategorie(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }}
