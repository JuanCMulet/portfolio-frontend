import { Component, OnInit, Input} from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Education } from './Education'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  @Input() loggedIn:boolean = false;
  educations:Education[] = [];
  showAddEduc:boolean = false;

  constructor(
    private db:DataService
  ) {
   }

  ngOnInit(): void {
    this.db.getData("education").subscribe(data => {
      this.educations = data
    })
  }

  toggleForm() {
    this.showAddEduc = !this.showAddEduc;
  }

  deleteEducation(education:Education) {
    this.db.deleteItem("education", education).subscribe( 
      () => {
        this.educations = this.educations.filter( (e) => {
          return e.id !== education.id 
        })
      });
  }

  addEducation(education:Education) {
    this.educations.push(education);
    this.db.addItem("education", education).subscribe( () => {
      this.db.getData("education").subscribe(data => {
        this.educations = data
      })
    })
    this.showAddEduc = false;
  }

  updateEducation(education:Education) {
    this.db.updateItem("education", education).subscribe()
  }

}
