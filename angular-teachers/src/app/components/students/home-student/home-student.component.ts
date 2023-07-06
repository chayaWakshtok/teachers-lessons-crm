import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { de } from 'date-fns/locale';
import { Lesson } from 'src/app/models/lesson';
import { Specialty } from 'src/app/models/specialty';
import { Subject } from 'src/app/models/subject';
import { LessonService } from 'src/app/services/lesson.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {

  chooseMenu: string = 'Newest';
  openMenu: boolean = false;
  lessons: Lesson[] = [];
  lessonsSearch: Lesson[] = [];
  subjectsList: Subject[] = [];
  specialities: Specialty[] = [];
  subjectId: number = 0;
  specialtyId: number = 0;
  level: number = 0;
  stars: number = 0;

  constructor(public lessonService: LessonService,
    public subjectService: SubjectService,
    public router: Router) { }

  ngOnInit(): void {
    this.subjectService.getAll().subscribe((res: any) => {
      console.log(res);
      this.subjectsList = res;
    })
    this.lessonService.getAll().subscribe((res: any) => {
      console.log(res);
      this.lessons = res;
      this.lessonsSearch = res;
    })
  }

  filter() {
    this.lessonsSearch = this.lessons;
    if (this.subjectId != 0) {
      this.lessonsSearch = this.lessonsSearch.filter(x => x.subjectId == this.subjectId);
    }
    if (this.specialtyId != 0) {
      this.lessonsSearch = this.lessonsSearch.filter(x => x.specialtyId == this.specialtyId);
    }
    if (this.level != 0) {
      if (this.level == 1)
        this.lessonsSearch = this.lessonsSearch.filter(x => x.level >= 0 && x.level < 4);
      if (this.level == 2)
        this.lessonsSearch = this.lessonsSearch.filter(x => x.level >= 4 && x.level < 8);
      if (this.level == 3)
        this.lessonsSearch = this.lessonsSearch.filter(x => x.level >= 8);
    }
    if (this.stars != 0) {
      this.lessonsSearch = this.lessonsSearch.filter(x => x.stars == this.stars);
    }
  }

  sort() {
    if (this.chooseMenu == 'Newest') {
      this.lessonsSearch.sort((a, b) => new Date(b.createdAt.toString()).getTime() - new Date(a.createdAt.toString()).getTime());
    }
    if (this.chooseMenu == 'Lowest price') {
      this.lessonsSearch.sort((a, b) => a.price - b.price);
    }
    if (this.chooseMenu == 'Highest price') {
      this.lessonsSearch.sort((a, b) => b.price - a.price);
    }
    if (this.chooseMenu == 'Highest rating') {
      this.lessonsSearch.sort((a, b) => b.stars - a.stars);
    }

  }

  clickLesson(lesson: Lesson) {
    this.router.navigate(['student/lesson', lesson.id]);
  }


  time_convert(num: number) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes;
  }
}
