import { Component, OnInit } from '@angular/core';
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

  chooseMenu:string = 'Newest';
  openMenu:boolean = false;
  lessons:Lesson[] = [];
  subjectsList:Subject[] = [];
  specialities:Specialty[] = [];

  constructor(public lessonService:LessonService,
    public subjectService: SubjectService,) { }

  ngOnInit(): void {
    this.subjectService.getAll().subscribe((res:any)=>{
      this.subjectsList = res;
    })
    this.lessonService.getAll().subscribe((res:any)=>{
      console.log(res);
      this.lessons = res;
    })
  }

}
