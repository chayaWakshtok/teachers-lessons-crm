import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday';
import { Lesson } from '../models/lesson';
import { map } from 'rxjs';
import { Message } from '../models/message';
import { Remark } from '../models/remark';

@Injectable({
  providedIn: 'root'
})
export class RemarkService {

  constructor(public httpClient: HttpClient) { }

  add(remark: Remark) {
    return this.httpClient.post(`${environment.apiUrl}remark/create`, { ...remark })
  }

  getAllByStudent(id: number) {
    return this.httpClient.get(`${environment.apiUrl}remark/getAllByStudent?id=${id}`);
  }

  getAllByLesson(id: number) {
    return this.httpClient.get(`${environment.apiUrl}remark/getAllByLesson?id=${id}`);
  }

}
