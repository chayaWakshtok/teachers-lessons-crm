import { Component, OnInit } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/models/lesson';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent {
  lessons: Lesson[] = [];
  user: User | null | undefined;

  constructor(
    public router: Router,
    public iconSet: IconSetService,
    public accountService: AccountService,
    public lessonService: LessonService
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.accountService.user.subscribe(x => {
      this.user = x;

      this.lessonService.getAllByTeacher(this.user?.teacher?.id ?? 0).subscribe((res: any) => {
        this.lessons = res;
      })
    });
  }

  addNew() {
    this.router.navigate(["teacher/holiday"])
  }

  edit(id: number) {
    this.router.navigate(["teacher/holiday", { id: id }])
  }
}
