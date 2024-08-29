import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientType } from '../../Models/clientType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientTypeService {

  private apiUrl = 'http://localhost:3000/clientTypes'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<ClientType[]> {
    return this.http.get<ClientType[]>(this.apiUrl);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getClientTypeById(id: number): Observable<ClientType> {
    return this.http.get<ClientType>(`${this.apiUrl}/${id}`);
  }
  addClientType(clientType: ClientType): Observable<ClientType> {
    return this.http.post<ClientType>(this.apiUrl, clientType);
  }

  updateClientType(id: number, clientType: ClientType): Observable<ClientType> {
    return this.http.put<ClientType>(`${this.apiUrl}/${id}`, clientType);
  }
}
