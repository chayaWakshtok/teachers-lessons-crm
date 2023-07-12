import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday';
import { Lesson } from '../models/lesson';
import { Observable, map } from 'rxjs';
import { Hour } from '../models/hour';

@Injectable({
  providedIn: 'root'
})
export class HourService {

  constructor(public httpClient: HttpClient) { }

  add(hour: Hour) {
    return this.httpClient.post(`${environment.apiUrl}hour/create`, { ...hour })
  }

  update(hour: Hour) {
    return this.httpClient.put(`${environment.apiUrl}hour/update`, { ...hour })
  }

  getAllByTeacher(id: number):Observable<Hour[]> {
    return this.httpClient.get<Hour[]>(`${environment.apiUrl}hour/getAllByTeacher?id=${id}`)
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}hour/findById?id=${id}`)
    .pipe(
      map((response: any) => response),
      map((hour:Hour) => {
        return hour;
      })
    );
  }

  delete(id: number) {
    return this.httpClient.get(`${environment.apiUrl}hour/delete?id=${id}`)
  }

}
