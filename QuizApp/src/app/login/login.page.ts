import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

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
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  login() {
    this.quizService.login(this.email, this.password).then(data => {
      // console.log(data);
      if (data.operationType == "signIn") {
        this.router.navigate(['/home']);
        this.presentToast();
      } else {
        this.presentAlert(data);
      }
    });
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Alert',
      message: data,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Welcome Back.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
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
