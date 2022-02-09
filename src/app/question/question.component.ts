import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string="";
  public questionList : any =[];
  public currentQuestion: number = 0;
  public points : number=0;
  counter = 60;
  correctAnswer:number=0;
  incorrectAnswer:number=0;
  interval$:any;

  constructor(private questionService : QuestionService) { }

  // Initialize
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions(){
this.questionService.getQuestionJson()
.subscribe(res=>{
  // Store questions in question list
  this.questionList = res.questions;
})
  }
// Methods for page navigation (currentQuestion array)!
  nextQuestion(){
    this.currentQuestion++;
  }

  previousQuestion(){
    this.currentQuestion--
  }

// ANSWER METHOD
answer(currentQno:number,option:any){
  if(option.correct){
    this.points+=10;
    this.correctAnswer++;
    this.currentQuestion++
  } else{
    this.points-=10;
    this.currentQuestion++;
    this.incorrectAnswer++;
  }
}

// METHOD FOR COUNTER
  startCounter(){

  }
  stopCounter(){

  }
  resetCounter(){

  }

}
