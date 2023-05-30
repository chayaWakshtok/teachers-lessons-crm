import { Component } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent {
  constructor(
    public router: Router,
    public iconSet: IconSetService
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  addNew()
  {
    this.router.navigate(["teacher/lesson"])
  }
}
