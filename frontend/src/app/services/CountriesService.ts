import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/Country';
import { Observable, map } from 'rxjs';
import e from 'express';
import { State } from '../interfaces/State';

@Injectable({
  providedIn: 'root',
})
export class CountryAndStateService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/countries';
  private stateUrl =
    'http://localhost:8080/api/states/search/findByCountryName?name=';

  getCountries(): Observable<Country[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((res: any) => {
        return res._embedded.countries.map((country: any) => {
          delete country._links;
          return country;
        });
      })
    );
  }

  getStates(code: string): Observable<State[]> {
    return this.http.get<any>(this.stateUrl + code).pipe(
      map((res: any) => {
        return res._embedded.states.map((state: any) => {
          delete state._links;
          return state;
        });
      })
    );
  }
}
