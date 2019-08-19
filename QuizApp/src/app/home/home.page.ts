import { Router } from '@angular/router';
import { QuizService } from './../Service/quiz.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

user = firebase.auth().currentUser;
username = [];

  uid;
  name;

  constructor(
    public quizService: QuizService,
    private router: Router
    ) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
          this.router.navigate(['/login']);
        }
      });
     }

  logout() {
    this.quizService.logout();
    this.navigateHome();
  }

  navigateHome() {
    this.router.navigate(['/login']);
  }

}
