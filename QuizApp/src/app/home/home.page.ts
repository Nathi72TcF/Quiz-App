import { Router } from '@angular/router';
import { UserService } from './../Service/user.service';
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

  userinfor;

  constructor(
    public quizService: QuizService,
    private router: Router
    ) { }

  logout() {
    this.quizService.logout();
    this.navigateHome();
  }

  navigateHome() {
    this.router.navigate(['/login']);
  }

}
