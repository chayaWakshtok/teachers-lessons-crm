import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Messages } from 'primeng/messages';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { MessagesService } from 'src/app/services/message.service';

@Component({
  selector: 'app-student-send-message',
  templateUrl: './student-send-message.component.html',
  styleUrls: ['./student-send-message.component.scss']
})
export class StudentSendMessageComponent implements OnInit {

  user: User | null | undefined;
  messages: Message[] = [];

  constructor(public messageService: MessagesService,
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {

    this.accountService.user.subscribe(x => {
      this.user = x;
      this.messageService.getAllTo(this.user?.id ?? 0).subscribe((res: any) => {
        this.messages = res;
        console.log(res);
      })
    })
  }

  delete(id: number) {
    this.messageService.delete(id).subscribe((res: any) => {
      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.messages = this.messages.filter(x => x.id != id);
      this.cdRef.detectChanges();

    })
  }

  updateRead(message: Message) {
    message.isRead = true;
    this.messageService.update(message).subscribe((res: any) => {
      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.cdRef.detectChanges();
    })
  }


}
