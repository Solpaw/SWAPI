import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPeopleListResponse } from '../models/swapi.models';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getPeople(search: string, paginationUrl?: string): Observable<IPeopleListResponse> {
    if(paginationUrl) {
      const url = paginationUrl;
      return this.http.get<IPeopleListResponse>(url);
    }

    const url = this.baseUrl + '/people/';
    const params = new HttpParams().set('search', search);

    return this.http.get<IPeopleListResponse>(url, { params });
  }
}
