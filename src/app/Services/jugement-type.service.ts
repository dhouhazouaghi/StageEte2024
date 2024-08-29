import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JugementType } from '../../Models/JugementType';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugementTypeService {

  private apiUrl = 'http://localhost:3000/JugementTypes';

  constructor(private http: HttpClient) {}

  // Get all JugementTypes
  getAllJugementTypes(): Observable<JugementType[]> {
    return this.http.get<JugementType[]>(this.apiUrl);
  }

  // Get a single JugementType by ID
  getJugementTypeById(id: number): Observable<JugementType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<JugementType>(url);
  }

  // Add a new JugementType
  addJugementType(jugementType: JugementType): Observable<JugementType> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<JugementType>(this.apiUrl, jugementType, { headers });
  }

  // Update an existing JugementType
// jugement-type.service.ts
updateJugementType(id: number, jugementType: JugementType): Observable<JugementType> {
  return this.http.put<JugementType>(`${this.apiUrl}/${id}`, jugementType);
}


  // Delete a JugementType
  deleteJugementType(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
