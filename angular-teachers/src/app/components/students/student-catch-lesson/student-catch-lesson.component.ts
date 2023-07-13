import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchLesson } from 'src/app/models/catch-lesson';
import { Message } from 'src/app/models/message';
import { Remark } from 'src/app/models/remark';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { CatchLessonService } from 'src/app/services/catch-lesson.service';
import { MessagesService } from 'src/app/services/message.service';
import { RemarkService } from 'src/app/services/remark.service';

@Component({
  selector: 'app-student-catch-lesson',
  templateUrl: './student-catch-lesson.component.html',
  styleUrls: ['./student-catch-lesson.component.scss']
})
export class StudentCatchLessonComponent implements OnInit {

  user: User | null | undefined;
  catchLessons: catchLesson[] = [];
  now = new Date();
  dayBefore = new Date(new Date().setDate(this.now.getDate() + 1));
  messageSend: Message = new Message();
  remark: Remark = new Remark();


  constructor(
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    public catchLessonService: CatchLessonService,
    public messageService: MessagesService,
    private alertService: AlertService,
    private remarkService:RemarkService

  ) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.catchLessonService.getAllByStudent(this.user?.student?.id ?? 0).subscribe((res: any) => {
        this.catchLessons = res;
        console.log(this.catchLessons);
        this.cdRef.detectChanges();
      })

    });
  }

  stars: number[] = [1, 2, 3, 4, 5];

  countStar(star: number) {
    this.remark.stars = star;
    console.log('Value of star', star);
  }

  delete(id: number) {
    this.catchLessonService.delete(id).subscribe((res: any) => {
      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.catchLessons = this.catchLessons.filter(x => x.id != id);
      this.cdRef.detectChanges();
    })
  }

  sendMessage() {
    this.messageSend.type = 1;
    this.messageService.add(this.messageSend).subscribe((res: any) => {
      this.visible = false;

      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.cdRef.detectChanges();
    })
  }

  sendRemark() {
    this.remarkService.add(this.remark).subscribe((res: any) => {
      this.visibleRemark = false;

      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.cdRef.detectChanges();
    })
  }

  public visible = false;

  public visibleRemark = false;

  toggleLiveDemo(id: number) {

    var catchL = this.catchLessons.find(x => x.id == id);

    this.messageSend = new Message();
    this.messageSend.fromUserId = this.user?.id ?? 0;
    this.messageSend.toUserId = catchL?.teacher.userId ?? 0;
    this.messageSend.isRead = false;

    this.visible = !this.visible;
  }

  toggleLiveDemoRemark(id: number) {

    var catchL = this.catchLessons.find(x => x.id == id);

    this.remark = new Remark();
    this.remark.studentId = this.user?.student?.id ?? 0;
    this.remark.catchLessonId = catchL?.id ?? 0;
    this.remark.isRead = true;
    this.remark.stars = 0;
    this.visibleRemark = !this.visibleRemark;
  }

  closeModalRemarkSend() {
    this.visibleRemark = false;
  }

  closeModalSend() {
    this.visible = false;
  }

}
