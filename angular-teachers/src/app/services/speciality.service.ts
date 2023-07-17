import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/subject';
import { Specialty } from '../models/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(public httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${environment.apiUrl}speciality/getAll`)
  }

  add(speciality: Specialty) {
    return this.httpClient.post(`${environment.apiUrl}speciality/create`, { ...speciality })
  }

}
