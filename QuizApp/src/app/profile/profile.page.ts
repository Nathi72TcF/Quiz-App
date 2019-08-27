import { Component, OnInit } from '@angular/core';
import { QuizService } from './../Service/quiz.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  ID;
  userId;
  name;
  email;
  photoUrl;
  uid;

  users;
  used: any;

  constructor(
    public quizService: QuizService,
    public loadingController: LoadingController,
    private router: Router
  ) {
    this.userId = this.quizService.UserInfor();
    // this.users = this.quizService.getUserInformation();
    // this.used = this.quizService.getUserInformation();
    console.log(this.users);

    // getting user Auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.ID = user.uid;
        console.log(this.ID);
      } else {
        // No user is signed in.
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const loader = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'loading user Information...'
    });
    await loader.present();
    this.quizService.getUserInformation().then( getUserInformation => {
      this.used = getUserInformation;
      loader.dismiss();
    });
  }

}
