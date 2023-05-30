import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.scss']
})
export class HomeTeacherComponent implements OnInit {

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
      iconComponent: { name: 'cil-drop' }
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

  constructor() { }

  ngOnInit(): void {
  }

}
