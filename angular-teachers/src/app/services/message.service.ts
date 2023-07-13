import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday';
import { Lesson } from '../models/lesson';
import { map } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(public httpClient: HttpClient) { }

    add(message: Message) {
        return this.httpClient.post(`${environment.apiUrl}message/create`, { ...message })
    }

    update(message: Message) {
        return this.httpClient.put(`${environment.apiUrl}message/update`, { ...message })
    }

    getAllFrom(id: number) {
        return this.httpClient.get(`${environment.apiUrl}message/getAllByFrom?id=${id}`);
    }

    getAllTo(id: number) {
        return this.httpClient.get(`${environment.apiUrl}message/getAllByTo?id=${id}`);
    }


    updateAllReadByTo(id: number) {
        return this.httpClient.get(`${environment.apiUrl}message/updateRead?id=${id}`);
    }

    delete(id: number) {
        return this.httpClient.get(`${environment.apiUrl}message/delete?id=${id}`)
    }

}
