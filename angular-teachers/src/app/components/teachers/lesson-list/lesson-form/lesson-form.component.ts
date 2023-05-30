import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/models/lesson';
import { Specialty } from 'src/app/models/specialty';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
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

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private teacherService: TeachereService) {

  }
  ngOnInit(): void {

    this.accountService.user.subscribe(x => {
      this.user = x;

      this.teacherService.getTeacherSpecialties(this.user?.teacher?.id).subscribe((res: any) => {
        this.specialtyList = res.data.specialties;
      })

    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id)
      this.lesson = new Lesson();
    else {
      //get from server by id
    }


  }
}
