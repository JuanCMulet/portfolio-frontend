import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/service/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
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
   }

  ngOnInit(): void {
  }

}
