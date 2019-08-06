import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  Questionz;
  id;

  constructor(
    public quizService: QuizService,
    public router: ActivatedRoute
    ) {
      this.id = this.quizService.Return_ID();
      this.Questionz = this.quizService.firebaseQuiz(this.id);
      console.log(this.Questionz);
      console.log(this.id);
     }

    // answers1(event) {
    //   this.answer1 = event.detail.value;
    //   console.log(this.answer1);
    // }

    // answers2(event) {
    //   this.answer2 = event.detail.value;
    //   console.log(this.answer2);
    // }

    // answers3(event) {
    //   this.answer3 = event.detail.value;
    //   console.log(this.answer3);
    // }

    // answers4(event) {
    //   this.answer4 = event.detail.value;
    //   console.log(this.answer4);
    // }

  ngOnInit() {
  }

}
