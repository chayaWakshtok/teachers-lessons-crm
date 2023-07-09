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
import { SeriesListComponent } from './components/teachers/series-list/series-list.component';
import { SerirsFormComponent } from './components/teachers/series-list/serirs-form/serirs-form.component';
import { HomeStudentComponent } from './components/students/home-student/home-student.component';
import { LessonShowComponent } from './components/students/lesson-show/lesson-show.component';
import { StudentCalanderComponent } from './components/students/student-calander/student-calander.component';
import { StudentCatchLessonComponent } from './components/students/student-catch-lesson/student-catch-lesson.component';

const usersModule = () => import('./components/user/user.module').then(x => x.UserModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'teacher', canActivate: [AuthGuard], data: { title: 'Teacher', }, children: [
      {
        component: LessonListComponent, path: "lessons", data: { title: 'Lessons', }
      },
      { component: CalanderComponent, path: "calander", data: { title: 'Lessons', } },
      { component: LessonFormComponent, path: "lesson", data: { title: 'Lesson', } },
      { component: HolidayListComponent, path: "holidays", data: { title: 'Holidays', } },
      { component: HolidayFormComponent, path: "holiday", data: { title: 'Holiday', } },
      { component: HoursListComponent, path: "hours", data: { title: 'Hours', } },
      { component: HourFormComponent, path: "hour", data: { title: 'Hour', } },
      // { component: SeriesListComponent, path: "series", data: { title: 'series', } },
      // { component: SerirsFormComponent, path: "serie", data: { title: 'serie', } },
    ]
  },
  {
    path: 'student', canActivate: [AuthGuard], data: { title: 'Student', }, children: [
      { component: HomeStudentComponent, path: "", data: { title: 'Lesson', } },
      { component: HomeStudentComponent, path: "lessons", data: { title: 'Lessons', } },
      { component: LessonShowComponent, path: "lesson/:id", data: { title: 'Lesson', } },
      { component: StudentCalanderComponent, path: "calander", data: { title: 'Calander', } },
      { component: StudentCatchLessonComponent, path: "catch-lessons", data: { title: 'Catch Lessons', }}

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
