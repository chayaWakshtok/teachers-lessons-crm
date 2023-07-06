import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(public httpClient: HttpClient) { }

  registerStudent(student: any, userId: number) {
    return this.httpClient.post(`${environment.apiUrl}student/create`, { ...student, userId })
  }

  time_convert(num: number) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return [hours, minutes];
  }
}
