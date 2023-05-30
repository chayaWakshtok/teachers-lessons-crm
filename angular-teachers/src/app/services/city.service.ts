import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(public httpClient: HttpClient) { }

  getCities() {
    return this.httpClient.get<City[]>(`${environment.apiUrl}city/getAll`);
  }
}
