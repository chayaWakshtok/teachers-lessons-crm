import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeTeacherComponent } from './components/teachers/home-teacher/home-teacher.component';
import { HomeStudentComponent } from './components/students/home-student/home-student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  CardModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  DropdownModule as coreDrop
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LessonListComponent } from './components/teachers/lesson-list/lesson-list.component';
import { LessonFormComponent } from './components/teachers/lesson-list/lesson-form/lesson-form.component';
import { Select2Module } from 'ng-select2-component';
import { SeriesListComponent } from './components/teachers/series-list/series-list.component';
import { SerirsFormComponent } from './components/teachers/series-list/serirs-form/serirs-form.component';
import { UpdateDetailsComponent } from './components/teachers/update-details/update-details.component';
import { HolidayListComponent } from './components/teachers/holiday-list/holiday-list.component';
import { HolidayFormComponent } from './components/teachers/holiday-list/holiday-form/holiday-form.component';
import { MessageListComponent } from './components/teachers/message-list/message-list.component';
import { MessageFormComponent } from './components/teachers/message-list/message-form/message-form.component';
import { CalanderComponent } from './components/teachers/calander/calander.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/moment';
// import * as moment from 'moment';

// export function momentAdapterFactory() {
//   return adapterFactory(moment);
// };
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HoursListComponent } from './components/teachers/hours-list/hours-list.component';
import { HourFormComponent } from './components/teachers/hours-list/hour-form/hour-form.component';
import { DateAccessor } from './helpers/directives/date-input.directive';
import { DefaultHeaderComponent } from './components/default-header/default-header.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    HomeTeacherComponent,
    HomeStudentComponent,
    LessonListComponent,
    LessonFormComponent,
    SeriesListComponent,
    SerirsFormComponent,
    UpdateDetailsComponent,
    HolidayListComponent,
    HolidayFormComponent,
    MessageListComponent,
    MessageFormComponent,
    CalanderComponent,
    HoursListComponent,
    HourFormComponent,
    DateAccessor,
    DefaultHeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    StepsModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    IconModule,
    PrimeCalendarModule,
    coreDrop,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    MessageService,
    IconSetService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
