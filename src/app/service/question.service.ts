import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  // CALL JSON QUESTIONS HERE!!
  getQuestionJson(){
    return this.http.get<any>('assets/questions.json');
  }
}
