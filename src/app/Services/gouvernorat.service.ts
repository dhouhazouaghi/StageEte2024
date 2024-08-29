import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ObservableInput, switchMap } from 'rxjs';
import { Gouvernorat } from '../../Models/Gouvernorat';

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {

  private apiUrl = 'http://localhost:3000/Gouvernorats';

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

 // Get all Gouvernorats
 getGouvernorats(): Observable<Gouvernorat[]> {
  return this.http.get<Gouvernorat[]>(this.apiUrl);
}

// Get a single Gouvernorat by ID
getGouvernoratById(id: number): Observable<Gouvernorat> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Gouvernorat>(url);
}

// Add a new Gouvernorat
addGouvernorat(gouvernorat: Gouvernorat): Observable<Gouvernorat> {
  return this.http.post<Gouvernorat>(this.apiUrl, gouvernorat, this.httpOptions);
}

// Update an existing Gouvernorat
updateGouvernorat(id: number, gouvernorat: Gouvernorat): Observable<Gouvernorat> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<Gouvernorat>(url, gouvernorat, this.httpOptions);
}

// Delete a Gouvernorat
deleteGouvernorat(id: number): Observable<void> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete<void>(url);
}

searchGouvernorat(libelle: string): Observable<Gouvernorat[]> {
  const params = new HttpParams().set('libelle_like', libelle);
  return this.http.get<Gouvernorat[]>(this.apiUrl, { params });
}
}
