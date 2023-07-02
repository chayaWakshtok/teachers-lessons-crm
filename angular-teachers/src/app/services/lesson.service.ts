import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lesson } from '../models/lesson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(public httpClient: HttpClient) { }

  add(lesson: Lesson, file: any) {
    let formData = new FormData();
    debugger;
    formData.append("file", file, file.name);
    formData.append("durationHour", lesson.durationHour.toString());
    formData.append("title", lesson.title);
    formData.append("level", lesson.level ? lesson.level.toString() : "");
    formData.append("teacherId", lesson.teacherId.toString());
    formData.append("specialtyId", lesson.specialtyId.toString());
    formData.append("subjectId", lesson.subjectId.toString());
    formData.append("seriesId", lesson.seriesId ? lesson.seriesId.toString() : "");
    formData.append("price", lesson.price.toString());
    formData.append("description", lesson.description);

    return this.httpClient.post(`${environment.apiUrl}lesson/create`, { ...lesson })
  }

  update(lesson: Lesson) {
    return this.httpClient.put(`${environment.apiUrl}lesson/update`, { ...lesson })
  }

  getAllByTeacher(id: number) {
    return this.httpClient.get(`${environment.apiUrl}lesson/getAllByTeacher?id=${id}`)
  }

  getAll(): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>(`${environment.apiUrl}lesson/getAll`)
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}lesson/findById?id=${id}`)
  }

  delete(id: number) {
    return this.httpClient.get(`${environment.apiUrl}lesson/delete?id=${id}`)
  }

}
