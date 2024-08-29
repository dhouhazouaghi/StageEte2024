import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TribunalType } from '../../Models/TribunalType';

@Injectable({
  providedIn: 'root'
})
export class TribunalTypeServicesService {

  private readonly API_URL = "http://localhost:8084";
  private readonly TRIBUNAL_ADD_API_URL = `${this.API_URL}/api/tribunalTypes/addTribunal`;
  private readonly GET_ALL_TRIBUNALS_API_URL = `${this.API_URL}/api/tribunalTypes/GetAllTribunal`;
  private readonly TRIBUNAL_DELETE_API_URL = `${this.API_URL}/api/tribunalTypes/deleteTribunal/`;
  private readonly FIND_BY_REFERENCE = `${this.API_URL}/api/tribunalTypes/getById/`;
  private readonly UPDATE_TRIBUNAL_API_URL = `${this.API_URL}/api/tribunalTypes/updateTribunal/`;
  private readonly SEARCH_BY_LIBELLE_API_URL = `${this.API_URL}/api/tribunalTypes/searchByLibelle/`;


  constructor(private httpClient: HttpClient) { }

  addTribunalType(tribunaltype: TribunalType): Observable<any> {
    return this.httpClient.post(this.TRIBUNAL_ADD_API_URL, tribunaltype);
  }
  getTribunalTypes(): Observable<TribunalType[]> {
    return this.httpClient.get<TribunalType[]>(this.GET_ALL_TRIBUNALS_API_URL);
  }

  deleteTribunalType(tribunalTypeRef: number): Observable<string> {
    return this.httpClient.delete(`${this.TRIBUNAL_DELETE_API_URL}${tribunalTypeRef}`, { responseType: 'text' });
  }

  getTribunalTypeById(tribunalTypeRef: number): Observable<TribunalType> {
    return this.httpClient.get<TribunalType>(`${this.FIND_BY_REFERENCE}${tribunalTypeRef}`);
  }
  updateTribunalType(tribunalTypeRef: number, tribunalType: TribunalType): Observable<TribunalType> {
    return this.httpClient.put<TribunalType>(`${this.UPDATE_TRIBUNAL_API_URL}${tribunalTypeRef}`, tribunalType);
  }
  searchByLibelle(libelle: string): Observable<TribunalType[]> {
    const params = new HttpParams().set('libelle', libelle);
    return this.httpClient.get<TribunalType[]>(this.SEARCH_BY_LIBELLE_API_URL, { params });
  }
}
