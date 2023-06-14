import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { freeSet, brandSet, flagSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
import { Series } from 'src/app/models/series';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { LessonService } from 'src/app/services/lesson.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit{

  seriesList: Series[] = [];
  user: User | null | undefined;


  constructor(
    public router: Router,
    public iconSet: IconSetService,
    public accountService: AccountService,
    public seriesService: SeriesService,
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
    this.seriesService.getAllByTeacher(this.user?.teacher?.id ?? 0).subscribe((res: any) => {
      this.seriesList = res;
    })
  }

  addNew() {
    this.router.navigate(["teacher/serie"])
  }

  edit(id: number) {
    this.router.navigate(["teacher/serie", { id: id }])
  }

  delete(id: number) {
    this.seriesService.delete(id).subscribe((res: any) => {
      this.alertService.success(res.message, { keepAfterRouteChange: true });
      this.getData();
    }, err => {
      this.alertService.error(err);
    })
  }

}
