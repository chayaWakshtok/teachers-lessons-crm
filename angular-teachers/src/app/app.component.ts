import { Component } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { User } from './models/user';
import { AccountService } from './services/account.service';
import { cilListNumbered, cilPaperPlane, brandSet, freeSet, flagSet } from '@coreui/icons';
import { INavData } from '@coreui/angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navItems: INavData[] = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      iconComponent: { name: 'cil-speedometer' },
    },
    {
      name: 'Series',
      url: '/teacher/series',
      iconComponent: { name: 'cil-drop' }
    },
    {
      name: 'Holidays',
      url: '/teacher/holidays',
      iconComponent: { name: 'cil-drop' }
    },
    {
      name: 'Lessons',
      url: '/teacher/lessons',
      iconComponent: { name: 'cil-book' }
    },
    {
      name: 'Hours',
      url: '/teacher/hours',
      iconComponent: { name: 'cil-alarm' }
    },
    {
      name: 'Calander',
      url: '/teacher/calander',
      iconComponent: { name: 'cil-calendar' }
    },
    {
      name: 'Messages',
      url: '/teacher/messages',
      iconComponent: { name: 'cil-envelope-letter' }
    },
  ];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  user: User | null | undefined;

  constructor(private accountService: AccountService,
    public iconSet: IconSetService) {
    this.accountService.user.subscribe(x => { this.user = x; });
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    if (this.user?.roleId == 2) {
      this.navItems = [
        {
          name: 'Dashboard',
          url: '/dashboard',
          iconComponent: { name: 'cil-speedometer' },
        },
        {
          name: 'Series',
          url: '/teacher/series',
          iconComponent: { name: 'cil-drop' }
        },
        {
          name: 'Holidays',
          url: '/teacher/holidays',
          iconComponent: { name: 'cil-drop' }
        },
        {
          name: 'Lessons',
          url: '/teacher/lessons',
          iconComponent: { name: 'cil-book' }
        },
        {
          name: 'Hours',
          url: '/teacher/hours',
          iconComponent: { name: 'cil-alarm' }
        },
        {
          name: 'Calander',
          url: '/teacher/calander',
          iconComponent: { name: 'cil-calendar' }
        },
        {
          name: 'Messages',
          url: '/teacher/messages',
          iconComponent: { name: 'cil-envelope-letter' }
        },
      ];

    }
    else {
      this.navItems = [
        {
          name: 'Lessons',
          url: '/student/lessons',
          iconComponent: { name: 'cil-book' }
        },
        {
          name: 'Messages',
          url: '/student/messages',
          iconComponent: { name: 'cil-envelope-letter' }
        },
        {
          name: 'Calander',
          url: '/student/calander',
          iconComponent: { name: 'cil-calendar' }
        },
      ];
    }
  }

  initTab() {

  }

  logout() {
    this.accountService.logout();
  }
}
