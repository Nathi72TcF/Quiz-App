import { QuizService } from './../Service/quiz.service';
import { UserService } from './../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  uid;
  name;
  surname;
  age;
  contact;
  email;
  password;

  myFormz;

  constructor(
    public quizService: QuizService,
    public formBuilder: FormBuilder,
    public userService: UserService
    ) { }

  ngOnInit() {
  }

  signup() {
    this.userService.signup(
    this.email,
    this.password,
    this.name,
    this.surname,
    this.age,
    this.contact
    );
  }

  gender(event) {
    this.gender = event.detail.value;
    console.log(event);
  }

}
