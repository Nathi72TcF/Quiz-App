import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  database = firebase.database();

  // log in details

   name;

  // getting from database
  userId;
  catID;
  email;

  namecat;
  id;

  // quiz ts
  Questionz = [];
  Counter = 0;

  gameArray = [];

  // data from category database
  myCategory = [];

  constructor() { }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // log in, sign up and register code
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
  ////////////////////////////////////////////////////////////////////////////////

  // data for category
  getcat() {
  const data = firebase.database().ref().child('categories');
  data.on('child_added', snap => {
    this.namecat = snap.child('catName').val();
    console.log(this.namecat);
    this.id = snap.child('ID').val();
    console.log(this.id);
    // console.log('Heres your key: ' + key);
    this.myCategory.push({
    ID: this.id,
    categories: this.namecat,
  });
    console.log(this.myCategory);
    // console.log(this.myCategory + ' ' + key);
    });
  return this.myCategory;
  }

  Return_catID() {
    return this.namecat;
  }

  getID(cat) {
    this.catID = cat.ID;
  }

  Return_ID() {
    return this.userId;
  }
  /////////////////////////////////////////////////////////////////////////////////

  // Quiz TS Code
  firebaseQuiz(catID) {
    const rootRef = firebase.database().ref().child('Quiz/' + catID);
    rootRef.once('value', (snapshot) => {
      const value = snapshot.val();

      // tslint:disable-next-line: forin
      for (const key in value) {
        this.Counter++;
        this.Questionz.push({
          counter: this.Counter,
          Question: key,
          Answer: Object.keys(value[key]),
          value: Object.values(value[key])
        });
        console.log(this.Questionz);
        console.log(key);
        console.log(value);
      }
    });
    return this.Questionz;
  }
  ///////////////////////////////////////////////////////////////////////////////

}
