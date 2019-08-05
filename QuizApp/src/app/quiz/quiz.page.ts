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
  options;
  userId;
  ID;
  Counter = 0;

  constructor(
    public quizService: QuizService,
    public router: ActivatedRoute
    ) {
      this.ID = this.quizService.Return_ID();
      const rootRef = firebase.database().ref().child('Quiz/' + this.ID);
      rootRef.once('value', (snapshot) => {
        const value = snapshot.val();

        // tslint:disable-next-line: forin
        for (const key in value) {
          this.Counter++;
          this.Questionz.push({
            counter: this.Counter,
            key: key,
            option: Object.keys(value[key])
          });
          console.log(this.Questionz);
          console.log(key);
          console.log(value);
          this.options = Object.keys(value[key]);
        }
      });

    }

  ngOnInit() {
  }

}
