import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { el } from 'date-fns/locale';
import { catchLesson } from 'src/app/models/catch-lesson';
import { Holiday } from 'src/app/models/holiday';
import { Lesson } from 'src/app/models/lesson';
import { CatchLessonService } from 'src/app/services/catch-lesson.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-show',
  templateUrl: './lesson-show.component.html',
  styleUrls: ['./lesson-show.component.scss']
})
export class LessonShowComponent {

  lesson!: Lesson;
  id: number = 0;
  public visible = false;
  catchLessonsTeacher: catchLesson[] = [];
  holidays: Holiday[] = [];
  dateSelect: Date[] = [];
  catchLesson: catchLesson = new catchLesson();
  hoursChoose: Time[] = [];

  constructor(public lessonService: LessonService,
    private route: ActivatedRoute,
    public holidayService: HolidayService,
    public catchLessonService: CatchLessonService) {
    var foo = [];
    for (var i = 0; i <= 48; i++) {
      var n = i % 2 == 0 ? i / 2 + '.00' : (i + 1) / 2 - 1 + '.30';
      if (n < '10') //zero-left padding
        n = '0' + n;
      foo.push(n);
    }
    console.log(foo);
  }

  fillHours() {
    // var i = 8;
    // while (i < 22) {
    //   this.hoursChoose.push(i);
    //   i++;
    // }
  }


  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: boolean) {
    this.visible = event;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.lessonService.findById(this.id).subscribe((res: any) => {
      console.log(res);
      this.lesson = res;
      this.catchLessonService.getAllByTeacher(this.lesson.teacherId).subscribe((res: any) => {
        console.log(res);
        this.catchLessonsTeacher = res;
      });

      this.holidayService.getAllByTeacher(this.lesson.teacherId).subscribe((res: any) => {
        console.log(res);
        this.holidays = res;

        var date = new Date();
        var dateTill = new Date();
        dateTill.setDate(date.getDate() + 30);
        while (date <= dateTill) {
          var result = this.holidays.filter(x => x.isActive == true && x.date <= date && x.toDate >= date);
          if (result.length == 0)
            this.dateSelect.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
      }
      );
    });
  }

  chooseDate() {


    this.holidays.filter(p => p.allDay == false).forEach(x => {
      if (x.date == this.catchLesson.dateFrom) {
        alert("You can't catch lesson in this day");
        return;
      }
    });

    this.catchLesson.lessonId = this.lesson.id;
    this.catchLesson.studentId = Number(localStorage.getItem('id'));
    // this.catchLessonService.create(this.catchLesson).subscribe((res: any) => {
    //   console.log(res);
    //   alert("You catch lesson");
    // });

    // this.catchLesson.dateFrom;
  }
}
