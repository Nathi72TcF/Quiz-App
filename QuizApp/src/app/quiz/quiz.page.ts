import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  Questionz = [];
  question;
  userId;
  ID;
  Answers = [];
  answer;
  Counter = 0;

  constructor(
    public quizService: QuizService,
    public router: ActivatedRoute
    ) {
      this.ID = this.quizService.Return_ID();
      const rootRef = firebase.database().ref().child('Quiz/' + this.ID);
      rootRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.question = childSnapshot.key;
        this.answer = childSnapshot.val();
        this.Counter++;
        console.log(this.question);
        console.log(this.answer);
        this.Questionz.push({
          Counter: this.Counter,
          Questions: this.question,
          Answer: this.answer
        });
        console.log(this.Questionz);
        console.log(this.Answers);
        this.Answers.push({
          Counter: this.Counter,
          Answer: this.answer
        });
        console.log(this.Answers);
      });
    });

    
    }

  ngOnInit() {
  }

}

// this.answer = childSnapshot.val();