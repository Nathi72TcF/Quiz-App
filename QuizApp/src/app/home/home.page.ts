import { Router } from '@angular/router';
import { UserService } from './../Service/user.service';
import { QuizService } from './../Service/quiz.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public quizService: QuizService,
    public userService: UserService,
    private router: Router
    ) {}

  logout() {
    this.userService.logout();
    this.navigateHome();
  }

  navigateHome() {
    this.router.navigate(['/login']);
  }

}
