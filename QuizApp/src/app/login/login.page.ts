import { UserService } from './../Service/user.service';
import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  

  constructor(
    public quizService: QuizService,
    public Alert: AlertController,
    public loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
  }

  login() {
    this.quizService.login(this.email, this.password);
  }

  async resetepassword() {
    let alert = await this.Alert.create({
      header: 'Reset Password!',
      inputs: [{
        name: 'Email',
        type: 'email',
        placeholder: 'Please enter Your New Email'
      }],
      buttons: [{
        text: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'send',
        handler: (email) => {
          console.log('email sent');
          this.quizService.resetepassword(email);
        }
      }]
    });
    await alert.present();
  }

}
