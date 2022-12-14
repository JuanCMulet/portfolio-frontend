import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/service/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  subscription?: Subscription;

  constructor(
    private logService: LogService
  ) {
    this.subscription = this.logService.onToggle().subscribe(
      value => {
        this.loggedIn = value;
      }
    )
    console.log(this.loggedIn);
   }

  ngOnInit(): void {
  }

  toggleLogIn() {
    this.logService.toggleLogIn();
  }

  toggleLogOut() {
    console.log(this.loggedIn);
    this.logService.resetLogIn();
    console.log(this.loggedIn);
  }
}
