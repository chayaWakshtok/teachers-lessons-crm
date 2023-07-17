import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { HolidayService } from 'src/app/services/holiday.service';
import { AccountService } from 'src/app/services/account.service';
import { Holiday } from 'src/app/models/holiday';
import { User } from 'src/app/models/user';
import { CustomEventTitleFormatter } from 'src/app/helpers/provider/custom-event-title-formatter.provider';
import { CatchLessonService } from 'src/app/services/catch-lesson.service';
import { catchLesson } from 'src/app/models/catch-lesson';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalanderComponent implements OnInit {

  holidays: Holiday[] = [];
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
  events: CalendarEvent<Holiday | catchLesson>[] = [];
  catchLessons: catchLesson[] = [];

  constructor(
    public holidayService: HolidayService,
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    public catchLessonService: CatchLessonService
  ) {

  }

  ngOnInit() {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.events = [];

      this.holidayService.getAllByTeacher(this.user?.teacher?.id ?? 0).subscribe((res: any) => {
        this.holidays = res;
        this.holidays= this.holidays.filter(p=>p.isActive==true);
        this.holidays.forEach(h => {
          this.events.push({ start: new Date(h.date), title: h.title, allDay: h.allDay, end: new Date(h.toDate), color: colors['yellow'], meta: h })
        })
        this.cdRef.detectChanges();

      });

      this.catchLessonService.getAllByTeacher(this.user?.teacher?.id ?? 0).subscribe((res: any) => {
        this.catchLessons = res;
        this.catchLessons.forEach(r => {
          this.events.push({
            start: new Date(r.dateFrom), end: new Date(r.dateTo), title: `${r.lesson.title} to: ${r.student.user.firstName} ${r.student.user.lastName}`,
            color: colors["red"], meta: r
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
