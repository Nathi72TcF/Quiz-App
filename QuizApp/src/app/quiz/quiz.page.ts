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
  Userids;
  ID;

  questionSet = [];
  Answerz = [];
  gameArray = [];
  index = 0;
  correctAnswer;
  scoreBoolean;

  // getting user details
  user = firebase.auth().currentUser;
  uid;

  constructor(
    public quizService: QuizService,
    public router: ActivatedRoute
    ) {
      this.ID = this.quizService.Return_ID();
      this.Questionz = this.quizService.firebaseQuiz(this.ID);
      this.Userids = this.quizService.UserInfor();
     }

  ngOnInit() {

  }

  pushToGameArray(Question, Answer, correctAnswer, scoreBoolean) {
    this.gameArray.push({
      gameQuestions: Question,
      Answer: Answer,
      correctAnswer: correctAnswer, // undefined
      scoreBoolean: scoreBoolean //undefined
    });
    // console.log(this.gameArray);
  }

  Score(event, Question) {
    const question: string = Question;
    const Answer: string = event.detail.value;
    let correctAnswer: string;
    let scoreBoolean: string;
    // console.log(question);
    // console.log(Answer);

    // second phase
    if (this.Questionz.length >= 1) {
      // console.log(this.Questionz);
      console.log(question);
      for (let i = 0; i < this.Questionz.length; i++) {
        // console.log(i);
        if (this.Questionz[i].Question === Question) {
          for (let n = 0; n < this.Questionz[i].Answer.length; n++) {
            // console.log(this.Questionz[i].value[n]);
            if (this.Questionz[i].value[n]) {
              // console.log(this.Questionz[i].Answer[n]);
              this.correctAnswer = this.Questionz[i].Answer[n];
              // console.log(this.correctAnswer);
            }
          }
        }
      }
    }
    if (this.correctAnswer === Answer) {
      this.scoreBoolean = true;
      console.log(this.scoreBoolean);
      console.log("correct answer");
    }
    if (this.correctAnswer !== Answer) {
      this.scoreBoolean = false;
      console.log("wrong answer");
    }

    // 1st phase
    if (this.gameArray.length === 0) {
      this.pushToGameArray(Question, Answer, this.correctAnswer, this.scoreBoolean);
      // console.log('pushed to array successfully');
    } else if (this.gameArray.length > 0) {
      // console.log('Entered into else clause');
      for (let i = 0; i < this.gameArray.length; i++) {
        // console.log('Entered into for loop');
        if (this.gameArray[i].gameQuestions === question) {
          console.log('Question has a match in game array');
          this.index = this.gameArray.indexOf(this.gameArray[i]);
          // console.log(this.index);
        } else {
          // console.log('no match in game array');
          this.index = null;
        }
      }

      if (this.index != null) {
        console.log(this.index);
        this.gameArray[this.index].Answer = Answer;
        this.gameArray[this.index].scoreBoolean = this.scoreBoolean;
        console.log(Answer);
      } else if (this.index === null) {
        this.pushToGameArray(Question, Answer, this.correctAnswer, this.scoreBoolean);
      }
    }
    console.log(this.gameArray);
    console.log(this.index);

    // getting user infor
    if (this.user != null) {
      this.uid = this.user.uid;
      console.log(this.uid);
    }
  }

  submit() {
    let gamescore: number = 0;
    if (this.gameArray) {
      console.log(this.gameArray);
      for (let i = 0; i < this.gameArray.length; i++) {
        if (this.gameArray[i].scoreBoolean === true) {
          gamescore++;
        }
      }
      console.log(gamescore);
    }
    this.submitFirebase();
  }

  submitFirebase() {
    console.log(this.gameArray);
    let newPostKey = firebase.database().ref().child('Results/' + this.uid + '/').push().key;
    console.log(newPostKey);
    for (let i = 0; i < this.gameArray.length; i++) {
      firebase.database().ref().child('Results/' + '/' + this.uid + '/' + newPostKey + '/' + this.ID + '/' + this.gameArray[i].gameQuestions).push({
        userAnswer: this.gameArray[i].correctAnswer,
        userBooleanScore: this.gameArray[i].scoreBoolean
      });
      console.log(this.Userids);
    }
    // firebase.database().ref().child('Results/' + this.userId + '/' + newPostKey + '/' + this.name + '/').update({userScore: gamescore});
    console.log("Done Everything");
  }

}
