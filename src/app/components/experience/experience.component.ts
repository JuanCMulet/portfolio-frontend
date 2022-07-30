import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Experience } from './Experience'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  @Input() loggedIn:boolean = false;
  experiences:Experience[] = []
  showAddExp:boolean = false;

  constructor(
    private db:DataService
  ) {}

  ngOnInit(): void {
    this.db.getData("experience").subscribe(data => {
      this.experiences = data
    })
  }

  toggleForm() {
    this.showAddExp = !this.showAddExp;
  }

  deleteExperience(experience:Experience) {
    this.db.deleteItem("experience", experience).subscribe( 
      () => {
        this.experiences = this.experiences.filter( (e) => {
          return e.id !== experience.id 
        })
      });
  }

  addExperience(experience:Experience) {
    this.experiences.push(experience)
    this.db.addItem("experience", experience).subscribe( () => {
      this.db.getData("experience").subscribe(data => {
        this.experiences = data
      })
    })
    this.showAddExp = false;
  }

  updateExperience(experience:Experience) {
    this.db.updateItem("experience", experience).subscribe()
  }

}
