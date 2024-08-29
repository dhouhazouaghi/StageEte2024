import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etat } from '../../Models/Etat';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EtatService {

  private apiUrl = 'http://localhost:3000/etats'; 
  constructor(private http: HttpClient) { }

//OKKK
  getEtats(): Observable<Etat[]> {
    return this.http.get<Etat[]>(this.apiUrl);
  }



// Get a tribunal type by ID
getEtatById(id: number): Observable<Etat> {
  return this.http.get<Etat>(`${this.apiUrl}/${id}`);
}

// Add a new tribunal type
addEtat(etat: Etat): Observable<Etat> {
  return this.http.post<Etat>(this.apiUrl, etat);
}

// Update an existing tribunal type
updateEtat(id: number, etat: Etat): Observable<Etat> {
  return this.http.put<Etat>(`${this.apiUrl}/${id}`, etat);
}

// Delete a tribunal type
deleteEtat(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}



}
