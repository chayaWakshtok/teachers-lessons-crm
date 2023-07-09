import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday';
import { Lesson } from '../models/lesson';
import { map } from 'rxjs';
import { catchLesson } from '../models/catch-lesson';
import { ca } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class CatchLessonService {

  constructor(public httpClient: HttpClient) { }

  add(catchLesson: catchLesson) {
    return this.httpClient.post(`${environment.apiUrl}catchLesson/create`, { ...catchLesson })
  }

  update(catchLesson: catchLesson) {
    return this.httpClient.put(`${environment.apiUrl}catchLesson/update`, { ...catchLesson })
  }

  getAllByTeacher(id: number) {
    return this.httpClient.get(`${environment.apiUrl}catchLesson/getAllByTeacher?id=${id}`)
  }

  getAllByStudent(id: number) {
    return this.httpClient.get(`${environment.apiUrl}catchLesson/getAllByStudent?id=${id}`)
      .pipe(
      map((response: any) => response),
      map((catchLessons:catchLesson[]) => {
        catchLessons.forEach(catchLesson => {
          catchLesson.dateFrom=new Date(catchLesson.dateFrom);
          catchLesson.dateTo=new Date(catchLesson.dateTo);
        });
        return catchLessons;
      })
    );
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

  delete(id: number) {
    return this.httpClient.get(`${environment.apiUrl}catchLesson/delete?id=${id}`)
  }

}
