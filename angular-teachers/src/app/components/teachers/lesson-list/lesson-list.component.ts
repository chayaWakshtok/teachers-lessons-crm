import { Component, OnInit } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/models/lesson';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { LessonService } from 'src/app/services/lesson.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  lessons: Lesson[] = [];
  user: User | null | undefined;

  constructor(
    public router: Router,
    public iconSet: IconSetService,
    public accountService: AccountService,
    public lessonService: LessonService,
    private alertService: AlertService,

  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.getData();
    });
  }

  getData() {
    this.lessonService.getAllByTeacher(this.user?.teacher?.id ?? 0).subscribe((res: any) => {
      this.lessons = res;
    })
  }

  addNew() {
    this.router.navigate(["teacher/lesson"])
  }

  edit(id: number) {
    this.router.navigate(["teacher/lesson", { id: id }])
  }

  delete(id: number) {
    this.lessonService.delete(id).subscribe((res: any) => {
      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.getData();
    }, err => {
      this.alertService.error(err);
    })
  }
}
