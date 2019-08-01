import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  database = firebase.database();

   // getting from database
   userId;
   email;
 
   name;
   id;

  constructor() { }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorCode = error.message;
      console.log(errorCode);
    }).then((results) => {
      console.log('Loged In');
      console.log(results);
    });
  }

  signup(email, password, name, surname, age, contact) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    }).then((user) => {
      console.log('User Registerded');

      console.log(user['user'].uid);

      this.userId = user['user'].uid;
      this.email = user['user'].email;

      // inserting into database
      firebase.database().ref('users/' + this.userId).set({
        username: name,
        surnamez: surname,
        agez: age,
        contactz: contact,
        emails: email,
        }, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log('New User Saved');
          }
        });
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful.');

      // Sign-out successful.
    }).catch((error) => {
      console.log('An error happened.');
      // An error happened.
    });
  }

  resetepassword(email) {
    console.log(email);
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email.Email).then(() => {
    // Email sent.
    console.log('password reset');
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
    });
  }

}
