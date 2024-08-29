import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationMoyen } from '../../Models/NotificationMoyen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationMoyenServiceService {
  private apiUrl = 'http://localhost:3000/NotificationMoyens';

  constructor(private http: HttpClient) {}

  

getNotificationMoyens(): Observable<NotificationMoyen[]> {
  return this.http.get<NotificationMoyen[]>(this.apiUrl);
}

getNotificationMoyenById(id: number): Observable<NotificationMoyen> {
  return this.http.get<NotificationMoyen>(`${this.apiUrl}/${id}`);
}

addNotificationMoyen(notificationMoyen: NotificationMoyen): Observable<NotificationMoyen> {
  return this.http.post<NotificationMoyen>(this.apiUrl, notificationMoyen);
}

updateNotificationMoyen(id: number, notificationMoyen: NotificationMoyen): Observable<NotificationMoyen> {
  return this.http.put<NotificationMoyen>(`${this.apiUrl}/${id}`, notificationMoyen);
}

deleteNotificationMoyen(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

searchNotificationMoyensByLibelle(libelle: string): Observable<NotificationMoyen[]> {
  const params = new HttpParams().set('libelle_like', libelle);
  return this.http.get<NotificationMoyen[]>(this.apiUrl, { params });
}
}
