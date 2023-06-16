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
}
