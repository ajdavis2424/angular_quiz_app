import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

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
  progress:string="0";

  constructor(private questionService : QuestionService) { }

  // Initialize
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
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
    this.currentQuestion--;
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

// METHOD FOR COUNTER ---interval is imported from RX.js.
  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 6000000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

// METHOD FOR RESETTING THE QUIZ
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
  }

  // PROGRESS BAR PERCENT METHOD
  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString()
  }
}
