import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  database = firebase.database();

  // getting from database
  userId;
  username;
  userUID;
  email;

  name;
  id;

  // database objects (quiz ts)
  catName;
  myCategories = [];
  catKey;
  // quiz ts
  Questionz = [];
  options;
  Answers = [];
  ID;
  Counter = 0;

  // data from category database
  myCategory = [];

  // data from Results database
  myResults = [];
  score;
  user;
  uid;

  constructor() { }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // log in, sign up and register code
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
      console.log('Loged In');
      console.log(results);
      if (results) {
        this.userUID = results['user'].uid;
      }
      return results;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorCode = error.message;
      console.log(errorCode);
      return errorCode;
    });
  }

  signup(email, password, name, surname, age, contact) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        // console.log('User Registerded');
        console.log(user);
        this.userId = user['user'].uid;
        this.userUID = user['user'].uid;
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
      }
      return user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      return errorMessage;
      // ...
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
    this.clearArray(this.myCategory);
    const data = firebase.database().ref().child('categories');
    data.on('child_added', snap => {
    this.name = snap.child('catName').val();
    // console.log(this.name);
    this.id = snap.child('ID').val();
    // console.log(this.id);
    // console.log('Heres your key: ' + key);
    this.myCategory.push({
    ID: this.id,
    categories: this.name,
  });
    // console.log(this.myCategory);
    // console.log(this.myCategory + ' ' + key);
    });
    return this.myCategory;
  }

  UserInfor() {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.userUID = user.uid;
      } else {
        // No user is signed in.
      }
    });

    return this.userUID;
  }

  getID(cat) {
    this.userId = cat.ID;
  }

  Return_ID() {
    return this.userId;
  }

  // Quiz TS Code
  firebaseQuiz(ID) {

    this.Counter = 0;
    this.clearArray(this.Questionz);
    const rootRef = firebase.database().ref().child('Quiz/' + ID);
    rootRef.once('value', (snapshot) => {
      const value = snapshot.val();
      // console.log(value);
      // tslint:disable-next-line: forin
      for (const key in value) {
        this.Counter++;
        this.Questionz.push({
          counter: this.Counter,
          Question: key,
          Answer: Object.keys(value[key]),
          value: Object.values(value[key])
        });
        // console.log(this.Questionz);
        // console.log(key);
        // console.log(value);
      }
    });
    console.log(this.Questionz);

    return this.Questionz;
  }

  clearArray(array) {
    for (let i = 0; i < array.length; i++) {
      array.splice(i);
  }
 }

 ///////////////////////////////////////////////////////////////////////////////////
 // get results from firebase
 getResults(userId) {
  this.Counter = 0;
  this.clearArray(this.myResults);
  const rootRef = firebase.database().ref().child('Results/' + userId);
  rootRef.once('value', (snapshot) => {
      const value = snapshot.val();
      console.log(value);

      // tslint:disable-next-line: forin
      for (const key in value) {
        this.myResults.push({
          category_id: key,
          value: Object.values(value[key]),
          results: Object.keys(value[key]),
          values: value
        });
        console.log(this.myResults);
        console.log(key);
        console.log(value);
      }
    });
  return this.myResults;
  // console.log(this.myResults);
 }

//  getResults() {
//   var checking = firebase.database().ref().child('Results');
//   checking.on('child_added', snap =>{
//      this.score = snap.child('usersScore').val();
//      let key = snap.key
//      console.log('Heres your key: ' + key);
//      console.log(this.score);
//      this.myResults.push({
//       usersScore: this. score,
//       cal_key: key
//   });
//      console.log(this.myResults);
//   });
//   return this.myResults;
// }

}
