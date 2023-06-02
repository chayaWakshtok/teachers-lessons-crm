import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Series } from '../models/series';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(public httpClient: HttpClient) { }

  add(series: Series) {
    return this.httpClient.post(`${environment.apiUrl}series/create`, { ...series })
  }

  update(series: Series) {
    return this.httpClient.put(`${environment.apiUrl}series/update`, { ...series })
  }

  getAllByTeacher(id: number | undefined) {
    return this.httpClient.get(`${environment.apiUrl}series/getAllByTeacher?id=${id}`)
  }

}
