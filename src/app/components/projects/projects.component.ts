import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Project } from "./Projects"

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() loggedIn:boolean = false;
  projects:Project[] = [];
  showAddProj:boolean = false;

  constructor(
    private db:DataService
  ) {}

   ngOnInit(): void {
    this.db.getData("project").subscribe(data => {
      this.projects = data
    })
  }

  toggleForm() {
    this.showAddProj = !this.showAddProj;
  }

  deleteProject(project:Project) {
    this.db.deleteItem("project", project).subscribe( 
      () => {
        this.projects = this.projects.filter( (p) => {
          return p.id !== project.id 
        })
      });
  }

  addProject(project:Project) {
    this.projects.push(project);
    this.db.addItem("project", project).subscribe( () => {
      this.db.getData("project").subscribe(data => {
        this.projects = data
      })
    })
    this.showAddProj = false;
  }

  updateProject(project:Project) {
    this.db.updateItem("project", project).subscribe()
  }

}
