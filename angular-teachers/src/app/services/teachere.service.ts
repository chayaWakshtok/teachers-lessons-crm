import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachereService {

  constructor(public httpClient: HttpClient) { }

  registerTeacher(teacher: any, userId: number) {
    return this.httpClient.post(`${environment.apiUrl}teacher/create`, { ...teacher, userId })
  }

  // getTeacherSpecialties(teacherId: number | undefined): any {
  //   return this.httpClient.get(`${environment.apiUrl}teacher/teacherSpecialties?id=${teacherId}`)
  // }
}
