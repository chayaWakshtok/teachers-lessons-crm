import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CalanderComponent } from './components/teachers/calander/calander.component';
import { HolidayFormComponent } from './components/teachers/holiday-list/holiday-form/holiday-form.component';
import { HolidayListComponent } from './components/teachers/holiday-list/holiday-list.component';
import { HomeTeacherComponent } from './components/teachers/home-teacher/home-teacher.component';
import { LessonFormComponent } from './components/teachers/lesson-list/lesson-form/lesson-form.component';
import { LessonListComponent } from './components/teachers/lesson-list/lesson-list.component';
import { AuthGuard } from './helpers/auth.guard';
import { HoursListComponent } from './components/teachers/hours-list/hours-list.component';
import { HourFormComponent } from './components/teachers/hours-list/hour-form/hour-form.component';

const usersModule = () => import('./components/user/user.module').then(x => x.UserModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'teacher', canActivate: [AuthGuard], children: [
      { component: LessonListComponent, path: "lessons" },
      { component: CalanderComponent, path: "calander" },
      { component: LessonFormComponent, path: "lesson" },
      { component: HolidayListComponent, path: "holidays" },
      { component: HolidayFormComponent, path: "holiday" },
      { component: HoursListComponent, path: "hours" },
      { component: HourFormComponent, path: "hour" },
    ]
  },
  { path: 'user', loadChildren: usersModule },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
