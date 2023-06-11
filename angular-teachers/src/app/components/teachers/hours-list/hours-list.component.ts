import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { freeSet, brandSet, flagSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
import { Hour } from 'src/app/models/hour';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { HourService } from 'src/app/services/hour.service';

@Component({
  selector: 'app-hours-list',
  templateUrl: './hours-list.component.html',
  styleUrls: ['./hours-list.component.scss']
})
export class HoursListComponent {
  hours: Hour[] = [];
  user: User | null | undefined;

  constructor(
    public router: Router,
    public iconSet: IconSetService,
    public accountService: AccountService,
    public hourService: HourService,
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
    this.hourService.getAllByTeacher(this.user?.teacher?.id ?? 0).subscribe((res: any) => {
      this.hours = res;
    })
  }

  addNew() {
    this.router.navigate(["teacher/hour"])
  }

  edit(id: number) {
    this.router.navigate(["teacher/hour", { id: id }])
  }

  delete(id: number) {
    this.hourService.delete(id).subscribe((res: any) => {
      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.getData();
    }, err => {
      this.alertService.error(err);
    })
  }
}
