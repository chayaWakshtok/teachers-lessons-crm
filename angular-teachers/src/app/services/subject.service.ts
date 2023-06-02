import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(public httpClient: HttpClient) { }

  add(subject: Subject) {
    return this.httpClient.post(`${environment.apiUrl}subject/create`, { ...subject })
  }

  update(subject: Subject) {
    return this.httpClient.put(`${environment.apiUrl}subject/update`, { ...subject })
  }

  getAll() {
    return this.httpClient.get(`${environment.apiUrl}subject/getAll`)
  }

}
