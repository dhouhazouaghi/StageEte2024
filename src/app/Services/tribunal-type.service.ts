import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { TribunalType } from '../../Models/Tribunal';

@Injectable({
  providedIn: 'root'
})
export class TribunalTypeService {


  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/tribunalTypes';


  // Get all tribunal types
  getTribunalTypes(): Observable<TribunalType[]> {
    return this.http.get<TribunalType[]>(this.apiUrl);
  }

  // Get a tribunal type by ID
  getTribunalTypeById(id: number): Observable<TribunalType> {
    return this.http.get<TribunalType>(`${this.apiUrl}/${id}`);
  }

  // Add a new tribunal type
  addTribunalType(tribunalType: TribunalType): Observable<TribunalType> {
    return this.http.post<TribunalType>(this.apiUrl, tribunalType);
  }

  // Update an existing tribunal type
  updateTribunalType(id: number, tribunalType: TribunalType): Observable<TribunalType> {
    return this.http.put<TribunalType>(`${this.apiUrl}/${id}`, tribunalType);
  }

  // Delete a tribunal type
  deleteTribunalType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search tribunal types by libelle
  searchTribunalTypesByLibelle(libelle: string): Observable<TribunalType[]> {
    const params = new HttpParams().set('libelle_like', libelle);
    return this.http.get<TribunalType[]>(this.apiUrl, { params });
  }
}
