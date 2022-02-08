import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string="";
  constructor(private questionService : QuestionService) { }

  // Initialize
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
  }
  getAllQuestions(){

  }
}
