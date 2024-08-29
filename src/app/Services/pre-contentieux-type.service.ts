import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreContentieuxType } from '../../Models/PreContentieuxType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreContentieuxTypeService {

  private apiUrl = 'http://localhost:3000/preContentieuxTypes'; 

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPreContentieuxTypes(): Observable<PreContentieuxType[]> {
    return this.http.get<PreContentieuxType[]>(this.apiUrl);
  }


  addPreContentieuxType(preContentieuxType: PreContentieuxType): Observable<PreContentieuxType> {
    return this.http.post<PreContentieuxType>(this.apiUrl, preContentieuxType, this.httpOptions);
  }
  deletePreContentieuxType(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getPreContentieuxTypeById(id: number): Observable<PreContentieuxType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PreContentieuxType>(url);
  }
  updatePreContentieuxType(id: number, preContentieuxType: PreContentieuxType): Observable<PreContentieuxType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<PreContentieuxType>(url, preContentieuxType);
  }
}

