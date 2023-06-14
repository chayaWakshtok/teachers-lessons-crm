import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Series } from 'src/app/models/series';
import { Specialty } from 'src/app/models/specialty';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { LessonService } from 'src/app/services/lesson.service';
import { SeriesService } from 'src/app/services/series.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeachereService } from 'src/app/services/teachere.service';

@Component({
  selector: 'app-serirs-form',
  templateUrl: './serirs-form.component.html',
  styleUrls: ['./serirs-form.component.scss']
})
export class SerirsFormComponent {

  series!: Series;
  id!: number;
  user: User | null | undefined;
  specialtyList: Specialty[] = [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private teacherService: TeachereService,
    public seriesService: SeriesService,
    public specialityService: SpecialityService,
    private alertService: AlertService,
    public lessonService: LessonService) {
  }

  ngOnInit(): void {

    this.accountService.user.subscribe(x => {
      this.user = x;
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id)
      this.series = new Series();
    else {
      this.seriesService.findById(this.id).subscribe((res: any) => {
        this.series = res;
      })
    }

    this.specialityService.getAll().subscribe((res:any)=>{
      this.specialtyList=res;
    })
  }

  submit() {

    this.alertService.clear();
    if (this.series.id) {

      this.seriesService.update(this.series).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/series']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })
    }
    else {
      this.series.teacherId = this.user?.teacher?.id ?? 0;
      this.seriesService.add(this.series).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/series']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })

    }
  }

}
