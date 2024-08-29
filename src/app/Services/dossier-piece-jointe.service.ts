import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DossierPieceJointe } from '../../Models/DossierPieceJointe';

@Injectable({
  providedIn: 'root'
})
export class DossierPieceJointeService {

  private apiUrl = 'http://localhost:3000/DossierPieceJointe'; 

  constructor(private http: HttpClient) {}

  getAllDossierPieceJointes(): Observable<DossierPieceJointe[]> {
    return this.http.get<DossierPieceJointe[]>(this.apiUrl);
  }

  getDossierPieceJointeById(id: number): Observable<DossierPieceJointe> {
    return this.http.get<DossierPieceJointe>(`${this.apiUrl}/${id}`);
  }

  createDossierPieceJointe(dossierPieceJointe: DossierPieceJointe): Observable<DossierPieceJointe> {
    return this.http.post<DossierPieceJointe>(this.apiUrl, dossierPieceJointe);
  }

  updateDossierPieceJointe(id: number, dossierPieceJointe: DossierPieceJointe): Observable<DossierPieceJointe> {
    return this.http.put<DossierPieceJointe>(`${this.apiUrl}/${id}`, dossierPieceJointe);
  }

  deleteDossierPieceJointe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
