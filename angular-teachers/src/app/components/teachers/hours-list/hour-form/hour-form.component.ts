import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Holiday } from 'src/app/models/holiday';
import { Hour } from 'src/app/models/hour';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { HourService } from 'src/app/services/hour.service';
import { TeachereService } from 'src/app/services/teachere.service';

@Component({
  selector: 'app-hour-form',
  templateUrl: './hour-form.component.html',
  styleUrls: ['./hour-form.component.scss']
})
export class HourFormComponent {

  hour!: Hour;
  id!: number;
  user: User | null | undefined;
  loading: boolean = false;
  daysList:string[]=['Sunday','Monday','Tuesday', 'Wednesday','Thursday','Friday', 'Saturday'];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private teacherService: TeachereService,
    private alertService: AlertService,
    public hourService: HourService) {
  }

  ngOnInit(): void {

    this.accountService.user.subscribe(x => {
      this.user = x;
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id)
      this.hour = new Hour();
    else {
      this.hourService.findById(this.id).subscribe((res: any) => {
        this.hour = res;
        console.log(this.hour)
      })
    }
  }

  submit() {

    this.alertService.clear();
    this.loading = true;
    if (this.hour.id) {

      this.hourService.update(this.hour).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/hours']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })
    }
    else {
      this.hour.teacherId = this.user?.teacher?.id ?? 0;
      this.hourService.add(this.hour).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/hours']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })

    }
  }
}
