import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessionnelType } from '../../Models/ProfessionnelType';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfessionnelTypeServiceService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/professionnelTypes';

getProfessionnelTypes(): Observable<ProfessionnelType[]> {
  return this.http.get<ProfessionnelType[]>(this.apiUrl);
}

getProfessionnelTypeById(id: number): Observable<ProfessionnelType> {
  return this.http.get<ProfessionnelType>(`${this.apiUrl}/${id}`);
}

addProfessionnelType(professionnelType: ProfessionnelType): Observable<ProfessionnelType> {
  return this.http.post<ProfessionnelType>(this.apiUrl, professionnelType);
}

updateProfessionnelType(id: number, professionnelType: ProfessionnelType): Observable<ProfessionnelType> {
  return this.http.put<ProfessionnelType>(`${this.apiUrl}/${id}`, professionnelType);
}

deleteProfessionnelType(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

searchProfessionnelTypesByLibelle(libelle: string): Observable<ProfessionnelType[]> {
  const params = new HttpParams().set('libelle_like', libelle);
  return this.http.get<ProfessionnelType[]>(this.apiUrl, { params });
}
}

