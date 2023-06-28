import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/models/lesson';
import { Series } from 'src/app/models/series';
import { Specialty } from 'src/app/models/specialty';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { LessonService } from 'src/app/services/lesson.service';
import { SeriesService } from 'src/app/services/series.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeachereService } from 'src/app/services/teachere.service';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent implements OnInit {

  lesson!: Lesson;
  id!: number;
  user: User | null | undefined;
  specialtyList: Specialty[] = [];
  subjectList: Subject[] = [];
  seriesList: Series[] = [];
  loading: boolean = false;
  uploadedFiles: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private teacherService: TeachereService,
    public seriesService: SeriesService,
    public subjectService: SubjectService,
    private alertService: AlertService,
    public lessonService: LessonService) {
  }

  ngOnInit(): void {

    this.accountService.user.subscribe(x => {
      this.user = x;

      this.subjectService.getAll().subscribe((res: any) => {
        this.subjectList = res;
      })
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id)
      this.lesson = new Lesson();
    else {
      this.lessonService.findById(this.id).subscribe((res: any) => {
        this.lesson = res;
        this.chooseSubject();
        this.chooseSpeciality();
      })

    }
  }

  chooseSubject() {
    this.specialtyList = this.subjectList.find(p => p.id == this.lesson.subjectId)?.specialties ?? [];
    if (this.lesson.specialtyId) {
      debugger;
      if (!this.specialtyList.find(p => p.id == this.lesson.specialtyId))
        this.lesson.specialtyId = 0;
    }
  }

  chooseSpeciality() {
    this.seriesService.getAllByTeacher(this.user?.teacher?.id).subscribe((res: any) => {
      this.seriesList = res.filter((p: { specialtyId: number; }) => p.specialtyId == this.lesson.specialtyId);;
    })
    if (this.lesson.seriesId) {
      if (!this.seriesList.find(p => p.id == this.lesson.seriesId))
        this.lesson.seriesId = 0;
    }
  }

  submit() {

    this.alertService.clear();
    this.loading = true;
    if (this.lesson.seriesId == 0)
      this.lesson.seriesId = null;
    if (this.lesson.id) {

      this.lessonService.update(this.lesson).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/lessons']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })
    }
    else {
      this.lesson.teacherId = this.user?.teacher?.id ?? 0;
      this.lessonService.add(this.lesson, this.uploadedFiles[0]).subscribe((res: any) => {
        this.alertService.success(res.message, { keepAfterRouteChange: true });
        this.loading = false;
        this.router.navigate(['teacher/lessons']);
      }, err => {
        this.alertService.error(err);
        this.loading = false;
      })

    }
  }

  fileChange(element:any) {
    this.uploadedFiles = element.target.files;
  }
}
