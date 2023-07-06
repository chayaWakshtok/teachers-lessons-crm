import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { catchLesson } from 'src/app/models/catch-lesson';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { CatchLessonService } from 'src/app/services/catch-lesson.service';

@Component({
  selector: 'app-student-calander',
  templateUrl: './student-calander.component.html',
  styleUrls: ['./student-calander.component.scss']
})
export class StudentCalanderComponent {
  user: User | null | undefined;
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;
  events: CalendarEvent<catchLesson>[] = [];
  catchLessons: catchLesson[] = [];

  constructor(
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    public catchLessonService: CatchLessonService
  ) {

  }

  ngOnInit() {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.events = [];

      this.catchLessonService.getAllByStudent(this.user?.student?.id ?? 0).subscribe((res: any) => {
        this.catchLessons = res;
        this.catchLessons.forEach(r => {
          this.events.push({
            start: new Date(r.dateFrom), end: new Date(r.dateTo), title: `${r.lesson.title} with: ${r.teacher?.user?.firstName} ${r.teacher?.user?.lastName}`,
            color: {
              primary: '#ad2121',
              secondary: '#FAE3E3',
            }, meta: r
          })
        })
        this.cdRef.detectChanges();
        this.view = CalendarView.Week;
      })

    });
  }




  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    debugger;
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
