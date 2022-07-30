import { Component, OnInit, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { LogService } from 'src/app/service/log.service';
import { Account } from './Account'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loggedIn:boolean = false;
  accounts:Account[] = [];

  constructor(
    private db:DataService,
    private logService: LogService
  ) { }

  ngOnInit(): void {
    this.db.getData("user").subscribe(data => {
      this.accounts = data
    })
    console.log(this.accounts)
  }

  onSubmit(it:NgForm){
    if(it.valid){
      if (this.accounts.find(acc => {
        console.log(acc.username, it.value.username)
        if (acc.username === it.value.username) {
          console.log(acc.password, it.value.password)
          console.log("contraseña correcta")
          return acc.password === it.value.password
        }
        else {
          console.log("contraseña incorrecta")
          return false
        }
      })) {
        this.logService.toggleLogIn();
      }
    }
  }

}
