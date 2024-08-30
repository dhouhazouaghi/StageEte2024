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

   getEtats(): Observable<Etat[]> {
    return this.http.get<Etat[]>(this.apiUrl);
  }



 
getEtatById(id: number): Observable<Etat> {
  return this.http.get<Etat>(`${this.apiUrl}/${id}`);
}

 
addEtat(etat: Etat): Observable<Etat> {
  return this.http.post<Etat>(this.apiUrl, etat);
}

 
updateEtat(id: number, etat: Etat): Observable<Etat> {
  return this.http.put<Etat>(`${this.apiUrl}/${id}`, etat);
}
 
deleteEtat(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}



}
