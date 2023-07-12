import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchLesson } from 'src/app/models/catch-lesson';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { CatchLessonService } from 'src/app/services/catch-lesson.service';

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




  constructor(
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    public catchLessonService: CatchLessonService
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

  delete(id: number) {

  }

  sendMessage(id: number) {

  }


}
