import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Skill } from './Skills'


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @Input() loggedIn:boolean = false;
  skills:Skill[] = [];
  showAddSkill:boolean = false;

  constructor(
    private db: DataService
  ) {}

  ngOnInit(): void {
    this.db.getData("skill").subscribe(data => {
      this.skills = data
    })
  }

  toggleForm() {
    this.showAddSkill = !this.showAddSkill;
  }

  deleteSkill(skill:Skill) {
    this.db.deleteItem("skill", skill).subscribe( 
      () => {
        this.skills = this.skills.filter( (s) => {
          return s.id !== skill.id
        })
      });
  }

  addSkill(skill:Skill) {
    this.db.addItem("skill", skill).subscribe( () => {
      this.db.getData("skill").subscribe(data => {
        this.skills = data
      })
    })
    this.showAddSkill = false;
  }

  updateSkill(skill:Skill) {
    this.db.updateItem("skill", skill).subscribe()
  }

}
