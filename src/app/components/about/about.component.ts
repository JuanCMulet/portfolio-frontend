import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { About } from './About'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() loggedIn:boolean = false;
  about:any = {};

  constructor(
    private db:DataService
  ) {}
   
  ngOnInit(): void {
    this.db.getData("about").subscribe(data => {
      this.about = data[0]
    })
  }

  updateBackground(background:About) {
    this.about.backImage = background.backImage;
    this.db.updateItem("about", this.about).subscribe()
  }

  updateProfile(profile:About) {
    this.about.name = profile.name;
    this.about.profileImage = profile.profileImage;
    this.about.position = profile.position;
    this.db.updateItem("about", this.about).subscribe()
  }

  updateDescription(description:About) {
    this.about.description = description.description;
    this.db.updateItem("about", this.about).subscribe()
  }

}
