import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { RegisterStudentComponent } from './register-student/register-student.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-teacher', component: RegisterTeacherComponent },
      { path: 'register-student', component: RegisterStudentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
