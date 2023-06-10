import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(public httpClient: HttpClient) { }

  add(lesson: Lesson) {
    return this.httpClient.post(`${environment.apiUrl}lesson/create`, { ...lesson })
  }

  update(lesson: Lesson) {
    return this.httpClient.put(`${environment.apiUrl}lesson/update`, { ...lesson })
  }

  getAllByTeacher(id: number) {
    return this.httpClient.get(`${environment.apiUrl}lesson/getAllByTeacher?id=${id}`)
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}lesson/findById?id=${id}`)
  }

  delete(id: number) {
    return this.httpClient.get(`${environment.apiUrl}lesson/delete?id=${id}`)
  }

}
