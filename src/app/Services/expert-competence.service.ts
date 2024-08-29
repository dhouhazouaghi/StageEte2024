import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpertCompetence } from '../../Models/ExpertCompetence';

@Injectable({
  providedIn: 'root'
})
export class ExpertCompetenceService {
  private apiUrl = 'http://localhost:3000/ExpertCompetence'; 

  constructor(private http: HttpClient) {}

  getExpertCompetences(): Observable<ExpertCompetence[]> {
    return this.http.get<ExpertCompetence[]>(this.apiUrl);
  }

  deleteExpertCompetence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  addExpertCompetence(expertCompetence:ExpertCompetence): Observable<ExpertCompetence> {
    return this.http.post<ExpertCompetence>(this.apiUrl, expertCompetence);
  }


  getExpertCompetenceById(id: number): Observable<ExpertCompetence> {
    return this.http.get<ExpertCompetence>(`${this.apiUrl}/${id}`);
  }

  updateExpertCompetence(id: number, expertCompetence:ExpertCompetence): Observable<ExpertCompetence> {
    return this.http.put<ExpertCompetence>(`${this.apiUrl}/${id}`, expertCompetence);
  }

}
