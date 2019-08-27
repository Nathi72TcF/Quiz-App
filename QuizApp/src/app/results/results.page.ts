import { Component, OnInit } from '@angular/core';
import { QuizService } from './../Service/quiz.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  resultsCat = [];
  results = [];
  userId;

  constructor(
    public quizService: QuizService,
    private router: Router
    ) {
    this.userId = this.quizService.UserInfor();
    this.resultsCat =  this.quizService.getCatRes(this.userId);
    // console.log(this.userId);
    // console.log(this.resultsCat);

    this.clearArray(this.results);
    this.quizService.getResults(this.userId).then(data => {
      let Counter;
      this.clearArray(this.results);
      // tslint:disable-next-line: forin
      for (let key in data) {
        Counter = 1;
        var catz = key
        // console.log(data[key]);
        // console.log(data);
        // console.log(key);
        for (let key2 in data[key]) {
          // tslint:disable-next-line: forin
          // console.log(key2);
          // console.log( data[key][key2]);
          // tslint:disable-next-line: forin
          for (let key3 in data[key][key2]) {
            // console.log(key3);
            // console.log(data[key][key2][key3]);
            this.results.push({
              counter: Counter++,
              catID: catz,
              questions: key3,
              options: (data[key][key2][key3]),
            });
          }
        }


        console.log(this.results);
      }
    });


    // login guard
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
        this.router.navigate(['/login']);
      }
    });
   }

   clearArray(array) {
    for (let i = 0; i < array.length; i++) {
      array.splice(i);
  }
 }

  ngOnInit() {
  }
}
