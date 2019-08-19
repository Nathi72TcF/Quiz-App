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

  results;
  userId;

  constructor(
    public quizService: QuizService,
    private router: Router
    ) {
    this.userId = this.quizService.UserInfor();
    console.log(this.userId);

    this.results = this.quizService.getResults(this.userId);
    console.log(this.results);

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

  ngOnInit() {
  }

}
