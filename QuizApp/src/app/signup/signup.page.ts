import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router,
    private alertController: AlertController,
    public toastController: ToastController
    ) { }

  ngOnInit() {
  }

  signup() {
    this.quizService.signup(
    this.email,
    this.password,
    this.name,
    this.surname,
    this.age,
    this.contact
    ).then(data => {
      console.log(data);
      if (data.operationType == "signIn") {
        this.router.navigate(['/home']);
        this.presentToast();
      } else {
        this.presentAlert(data);
      }
    });
  }

  gender(event) {
    this.gender = event.detail.value;
    console.log(event);
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Account Created.',
      duration: 9000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }

}
