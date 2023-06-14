import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(public httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${environment.apiUrl}speciality/getAll`)
  }

}
