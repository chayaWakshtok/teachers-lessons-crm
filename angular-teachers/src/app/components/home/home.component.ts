import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User | null;


  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

}
