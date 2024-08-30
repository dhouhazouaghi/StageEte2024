import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DossierAxe } from '../../Models/DossierAxe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierAxeService {

  private apiUrl = 'http://localhost:3000/dossierAxes';  

  constructor(private http: HttpClient) {}

  getAllDossierAxes(): Observable<DossierAxe[]> {
    return this.http.get<DossierAxe[]>(this.apiUrl);
  }

  getDossierAxeById(id: number): Observable<DossierAxe> {
    return this.http.get<DossierAxe>(`${this.apiUrl}/${id}`);
  }

  createDossierAxe(dossierAxe: DossierAxe): Observable<DossierAxe> {
    return this.http.post<DossierAxe>(this.apiUrl, dossierAxe);
  }

  updateDossierAxe(id: number, dossierAxe: DossierAxe): Observable<DossierAxe> {
    return this.http.put<DossierAxe>(`${this.apiUrl}/${id}`, dossierAxe);
  }

  deleteDossierAxe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
