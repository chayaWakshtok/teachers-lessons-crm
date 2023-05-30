import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    StepsModule,
    InputTextModule,
  ]
})
export class UserModule { }
