import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday';
import { Lesson } from '../models/lesson';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatchLessonService {

  constructor(public httpClient: HttpClient) { }

  // add(holiday: Holiday) {
  //   return this.httpClient.post(`${environment.apiUrl}holiday/create`, { ...holiday })
  // }

  // update(holiday: Holiday) {
  //   return this.httpClient.put(`${environment.apiUrl}holiday/update`, { ...holiday })
  // }

  getAllByTeacher(id: number) {
    return this.httpClient.get(`${environment.apiUrl}catchLesson/getAllByTeacher?id=${id}`)
  }

  // findById(id: number) {
  //   return this.httpClient.get(`${environment.apiUrl}holiday/findById?id=${id}`)
  //   .pipe(
  //     map((response: any) => response),
  //     map((holiday:Holiday) => {
  //       holiday.date=new Date(holiday.date);
  //       holiday.toDate=new Date(holiday.toDate);
  //       return holiday;
  //     })
  //   );
  // }

  // delete(id: number) {
  //   return this.httpClient.get(`${environment.apiUrl}holiday/delete?id=${id}`)
  // }

}
