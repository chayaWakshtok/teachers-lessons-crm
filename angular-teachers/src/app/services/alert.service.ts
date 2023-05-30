import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../models/alert';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  constructor(private messageService: MessageService) {

  }

  // convenience methods
  success(message: string, options?: any) {
    this.messageService.add({
      severity: "success",
      summary: "",
      detail: message,
    });
  }

  error(message: string, options?: any) {
    this.messageService.add({
      severity: "error",
      summary: "",
      detail: message,
    });
  }

  info(message: string, options?: any) {
    this.messageService.add({
      severity: "info",
      summary: "",
      detail: message,
    });

  }

  warn(message: string, options?: any) {
    this.messageService.add({
      severity: "warn",
      summary: "",
      detail: message,
    });
  }

  // clear alerts
  clear()
  {
    this.messageService.clear();
  }
}
