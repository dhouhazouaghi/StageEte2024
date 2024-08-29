import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BureauSpecialite } from '../../Models/BureauSpecialite';

@Injectable({
  providedIn: 'root'
})
export class BureauSpecialiteService {

  private apiUrl = 'http://localhost:3000/bureauSpecialites';
  
  constructor(private http: HttpClient) {}

  // Récupérer tous les BureauSpecialites
  getBureauSpecialites(): Observable<BureauSpecialite[]> {
    return this.http.get<BureauSpecialite[]>(this.apiUrl);
  }

  // Récupérer un BureauSpecialite par son ID
  getBureauSpecialiteById(id: number): Observable<BureauSpecialite> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<BureauSpecialite>(url);
  }

  // Ajouter un nouveau BureauSpecialite
  addBureauSpecialite(bureauSpecialite: BureauSpecialite): Observable<BureauSpecialite> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<BureauSpecialite>(this.apiUrl, bureauSpecialite, { headers });
  }

  // Mettre à jour un BureauSpecialite existant
  updateBureauSpecialite(id: number, bureauSpecialite: BureauSpecialite): Observable<BureauSpecialite> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<BureauSpecialite>(url, bureauSpecialite, { headers });
  }

  // Supprimer un BureauSpecialite
  deleteBureauSpecialite(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
