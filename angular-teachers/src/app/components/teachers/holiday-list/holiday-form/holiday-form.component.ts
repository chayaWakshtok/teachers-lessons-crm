import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Holiday } from 'src/app/models/holiday';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { LessonService } from 'src/app/services/lesson.service';
import { SeriesService } from 'src/app/services/series.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeachereService } from 'src/app/services/teachere.service';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss']
})
export class HolidayFormComponent {

  holiday!: Holiday;
  id!: number;
  user: User | null | undefined;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private teacherService: TeachereService,
    private alertService: AlertService,
    public holidayService: HolidayService) {
  }

  ngOnInit(): void {

    this.accountService.user.subscribe(x => {
      this.user = x;
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id)
      this.holiday = new Holiday();
    else {
      this.holidayService.findById(this.id).subscribe((res: any) => {
        this.holiday = res;
        console.log(this.holiday)
      })
    }
  }

  submit() {

    this.alertService.clear();
    this.loading = true;
    if (this.holiday.id) {

      this.holidayService.update(this.holiday).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/holidays']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })
    }
    else {
      this.holiday.teacherId = this.user?.teacher?.id ?? 0;
      this.holidayService.add(this.holiday).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/holidays']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })

    }
  }
}
