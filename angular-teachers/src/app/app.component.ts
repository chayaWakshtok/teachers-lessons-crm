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
    // {
    //   title: true,
    //   name: 'Theme'
    // },
    // {
    //   name: 'Specialies',
    //   url: '/teacher/specialies',
    //   iconComponent: { name: 'cil-drop' }
    // },
    // {
    //   name: 'Subjects',
    //   url: '/teacher/subjects',
    //   iconComponent: { name: 'cil-drop' }
    // },
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
      linkProps: { fragment: 'someAnchor' },
      iconComponent: { name: 'cil-pencil' }
    },
    {
      name: 'Calander',
      url: '/teacher/calander',
      linkProps: { fragment: 'someAnchor' },
      iconComponent: { name: 'cil-pencil' }
    },
    {
      name: 'Messages',
      url: '/teacher/messages',
      linkProps: { fragment: 'someAnchor' },
      iconComponent: { name: 'cil-pencil' }
    },
  ];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  user: User | null | undefined;

  constructor(private accountService: AccountService,
    public iconSet: IconSetService) {
    this.accountService.user.subscribe(x => { this.user = x;});
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  logout() {
    this.accountService.logout();
  }
}
