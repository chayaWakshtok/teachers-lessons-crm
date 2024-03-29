import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ca, el } from 'date-fns/locale';
import { catchLesson } from 'src/app/models/catch-lesson';
import { Holiday } from 'src/app/models/holiday';
import { Lesson } from 'src/app/models/lesson';
import { CatchLessonService } from 'src/app/services/catch-lesson.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { LessonService } from 'src/app/services/lesson.service';
import * as moment from 'moment';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { HourService } from 'src/app/services/hour.service';
import { forkJoin } from 'rxjs';
import { Hour } from 'src/app/models/hour';
import { Remark } from 'src/app/models/remark';


@Component({
  selector: 'app-lesson-show',
  templateUrl: './lesson-show.component.html',
  styleUrls: ['./lesson-show.component.scss']
})
export class LessonShowComponent {

  lesson!: Lesson;
  id: number = 0;
  catchLessonsTeacher: catchLesson[] = [];
  holidays: Holiday[] = [];
  dateSelect: Date[] = [];
  catchLesson: catchLesson = new catchLesson();
  hoursChoose: any[] = [];
  chooseTime: any = null;
  user: User | null | undefined;
  hoursTeacher: Hour[] = [];
  reviewByCount: number[] = [0, 0, 0, 0, 0];
  reviews: Remark[] = [];

  constructor(public lessonService: LessonService,
    private route: ActivatedRoute,
    public holidayService: HolidayService,
    public catchLessonService: CatchLessonService,
    public accountService: AccountService,
    private alertService: AlertService,
    public hourService: HourService,
    public router: Router
  ) {

  }

  fillHours() {
    //debugger;
    this.hoursChoose = [];
    var dateFrom = new Date(this.catchLesson.dateFrom);
    var hoursDay = new Date(new Date(this.catchLesson.dateFrom).setHours(0, 0, 0, 0));

    this.hoursTeacher.filter(p => p.isActive == true && p.day == dateFrom.getDay() + 1).forEach(hourTeacher => {
      var myMomentFrom = moment(hourTeacher.fromHour, "HH:mm:ss");
      var myMomentTo = moment(hourTeacher.tillHour, "HH:mm:ss");

      for (let minutsDay = myMomentFrom.hours() * 60 + myMomentFrom.minutes(); minutsDay <= myMomentTo.hours() * 60 + myMomentTo.minutes();) {
        hoursDay.setHours(0, 0, 0, 0);
        hoursDay.setMinutes(minutsDay)
        var d1 = false;
        var d2 = false;
        this.catchLessonsTeacher.filter(p=>p.dateFrom.getDate()==dateFrom.getDate()).forEach(catchL => {


          if (catchL.dateFrom <= hoursDay && catchL.dateTo > hoursDay) {
            d1 = true;
            var efresh =catchL.dateTo.getHours()*60+ catchL.dateTo.getMinutes() - minutsDay;
            minutsDay += Number(efresh);
          }

          if (catchL.dateFrom > hoursDay && catchL.dateFrom.getHours() * 60 + catchL.dateFrom.getMinutes() - minutsDay < Number(this.lesson.durationHour)) {
            d1 = true;
            minutsDay = catchL.dateTo.getHours() * 60 + catchL.dateTo.getMinutes();
          }
        })

        this.holidays.filter(p => p.allDay == false).forEach(x => {
          var date2 = new Date(this.catchLesson.dateFrom);
          if (x.date.getDate() == date2.getDate()) {
            if (minutsDay +Number(this.lesson.durationHour)  > x.date.getHours() * 60 + x.date.getMinutes() && minutsDay < x.toDate.getHours() * 60 + x.toDate.getMinutes()) {
              d1 = true;
              minutsDay = x.toDate.getHours() * 60 + x.toDate.getMinutes();
            }

          }
        });

        if (d1 == false) {
          var pushItem = Math.floor(minutsDay / 60) + ':' + (minutsDay % 60 > 9 ? minutsDay % 60 :'0' + (minutsDay % 60));
          if (this.hoursChoose.indexOf(pushItem) == -1)
            this.hoursChoose.push(pushItem);
          minutsDay += Number(this.lesson.durationHour)
        }

      }
    });




    //hour and minutes
    // var hours = Math.floor(this.lesson.durationHour / 60);
    // var minutes = this.lesson.durationHour % 60;
    // this.hoursChoose = [];//here the hours that the student will choose.

    // for (let hour = 0; hour <= 23; hour++) {

    //   //flag to hour
    //   var d = 0;
    //   //flag to half hour
    //   var d1 = 0;

    //   this.catchLessonsTeacher.forEach(x => {
    //     var date1 = new Date(x.dateFrom).setHours(0, 0, 0, 0);
    //     var date2 = new Date(this.catchLesson.dateFrom).setHours(0, 0, 0, 0);
    //     if (date1 == date2) {
    //       if (hour >= new Date(x.dateFrom).getHours() - hours - (minutes > 0 ? 1 : 0) && hour < new Date(x.dateTo).getHours()) {
    //         d = 1;
    //         if (30 <= new Date(x.dateTo).getMinutes()) {
    //           d1 = 1;
    //         }
    //       }
    //     }
    //   });

    //   this.holidays.filter(p => p.allDay == false).forEach(x => {
    //     var date1 = new Date(x.date).setHours(0, 0, 0, 0);
    //     var date2 = new Date(this.catchLesson.dateFrom).setHours(0, 0, 0, 0);
    //     if (date1 == date2) {
    //       if (hour >= new Date(x.date).getHours() - hours - (minutes > 0 ? 1 : 0) && hour < new Date(x.toDate).getHours()) {
    //         d = 1;
    //         if (30 <= x.toDate.getMinutes()) {
    //           d1 = 1;
    //         }
    //       }

    //     }
    //   });
    //   this.hoursTeacher.filter(p => p.isActive == true && p.day == this.catchLesson.dateFrom.getDay() + 1).forEach(x => {
    //     var timeArr = x.fromHour.split(":");
    //     var timeArr2 = x.tillHour.split(":");
    //     if (hour < Number(timeArr[0]) || hour > Number(timeArr2[0]) - hours) {
    //       d = 1;
    //       d1 = 1;
    //     }
    //   });


    //   if (d != 1) {
    //     this.hoursChoose.push(moment({ hour }).format('H:mm'));
    //     if (d1 != 1)
    //       this.hoursChoose.push(moment({ hour, minute: 30 }).format('H:mm'));
    //   }
    // }
  }


  ngOnInit(): void {

    this.accountService.user.subscribe(x => {
      this.user = x;
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.lessonService.findById(this.id).subscribe((res: any) => {
      this.lesson = res;
      this.lesson.durationHour=Number(this.lesson.durationHour);
      console.log(this.lesson);
      this.lesson.catchLessons.forEach(x => {
        x.remarks.forEach(y => {
          this.reviews.push(y);
          this.reviewByCount[y.stars - 1]++;
        });
      });
      this.catchLessonService.getAllByTeacher(this.lesson.teacherId).subscribe((res: any) => {
        this.catchLessonsTeacher = res;
        this.catchLessonsTeacher.forEach(cat => {
          cat.dateFrom = new Date(cat.dateFrom);

          cat.dateTo = new Date(cat.dateTo);
        })
        console.log(this.catchLessonsTeacher);
      });


      forkJoin([this.holidayService.getAllByTeacher(this.lesson.teacherId), this.hourService.getAllByTeacher(this.lesson.teacherId)]).subscribe(p => {
        this.holidays = p[0];
        this.holidays.forEach(h => {
          h.date = new Date(h.date);
          h.toDate = new Date(h.toDate);
        })
        this.hoursTeacher = p[1];

        var date = new Date();
        var dateTill = new Date();

        dateTill.setDate(date.getDate() + 30);

        while (date <= dateTill) {
          date.setDate(date.getDate() + 1);

          var result = [];
          var findDay = true;

          //check if date is holiday
          this.holidays.filter(x => x.allDay == true && x.isActive == true).forEach(element => {
            var dateE = new Date(element.date).setHours(0, 0, 0, 0);
            var dateToE = new Date(element.toDate).setHours(0, 0, 0, 0);
            if (dateE <= date.setHours(0, 0, 0, 0) && dateToE >= date.setHours(0, 0, 0, 0)) {
              result.push(element);
            }
          });

          //find day that teacher work
          var find = this.hoursTeacher.filter(p => p.isActive == true && p.day == date.getDay() + 1);
          if (find.length == 0)
            findDay = false;


          if (result.length == 0 && findDay)
            this.dateSelect.push(new Date(date));
        }
      });
    });
  }

  chooseDate() {

    this.catchLesson.dateFrom = new Date(this.catchLesson.dateFrom);
    this.catchLesson.lessonId = this.lesson.id;
    this.catchLesson.studentId = this.user?.student?.id ?? 0;
    this.catchLesson.teacherId = this.lesson.teacherId;

    this.fillHours();
    this.chooseTime = null;
  }

  submit() {
    if (this.chooseTime == null || this.catchLesson.dateFrom == null) {
      return;
    }
    var hours = Math.floor(this.lesson.durationHour / 60);
    var minutes = this.lesson.durationHour % 60;

    this.catchLesson.dateFrom.setHours(this.chooseTime.split(':')[0], this.chooseTime.split(':')[1], 0, 0);
    this.catchLesson.dateTo = new Date(new Date(this.catchLesson.dateFrom).setHours(this.catchLesson.dateFrom.getHours() + hours, this.catchLesson.dateFrom.getMinutes() + minutes, 0, 0));

    this.catchLessonService.add(this.catchLesson).subscribe((res: any) => {
      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.router.navigate(['student/lessons']);
    }, err => {
      this.alertService.error(err);
    });
  }

  time_convert(num: number) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes;
  }
}
