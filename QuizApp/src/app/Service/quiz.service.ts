import { Key } from 'protractor';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { resolve } from 'dns';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  database = firebase.database().ref();

  // getting from database
  userId;
  username;
  userUID;
  email;

  name;
  id;
  ////// Delete
  categoryArrayRes = [];
  ///////////////
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

  // Displaying data results
  // gotData;
  errData;
  catID;

  // getting data from users table
  userzArray = [];
  userNamez;
  userSurname;
  userAge;
  userContact;
  userEmail;
  userPaswword;
  userUIDUID;

  constructor() {}

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

  getUserInformation() {
    return new Promise ((resolve) => {
      this.clearArray(this.userzArray);
      const rootRef = firebase.database().ref('users/' + this.userUID);
      rootRef.on('value', (data) => {
      const userzz = data.val();
      this.userNamez = userzz.username;
      this.userSurname = userzz.surnamez;
      this.userAge = userzz.agez;
      this.userContact = userzz.contactz;
      this.userEmail = userzz.emails;
      this.userzArray.push({
        name: this.userNamez,
        surname: this.userSurname,
        age: this.userAge,
        contact: this.userContact,
        email: this.userEmail
        // userzz
      });
      resolve(this.userzArray);
      // console.log(this.userzArray);
    });
      return this.userzArray;
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  // data for category
  getcat() {
    return new Promise((resolve) => {
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
      resolve(this.myCategory);
    // console.log(this.myCategory);
    // console.log(this.myCategory + ' ' + key);
        });
      return this.myCategory;
      });
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

 //////////////////////////////////////////////////////////////////////////////////
 // category for results
 getCatRes(userId) {
   console.log(userId);
   let catRes =  firebase.database().ref().child('Results/' + userId);
   catRes.on('child_added', snapshot => {
      this.catID = snapshot.key;
      console.log(this.catID);
      this.categoryArrayRes.push({
        key: this.catID
      });
      });
   console.log(this.categoryArrayRes);
   return this.categoryArrayRes;
 }

 //  getCatRes() {
//   let catID;
//   return firebase.database().ref('Results' + this.userId).then((snapshot) => {
//     catID = snapshot.Key;
//   });
//   return catID;
// }


 // get results from firebase
 getResults(userId) {
  this.Counter = 0;
  let resultsquestion;
  let gameID;
  let values;
  this.clearArray(this.myResults);
 // tslint:disable-next-line: align
 return firebase.database().ref().child('Results/' + userId +  name).once('value').then( (snapshot) => {
      const values = snapshot.val();
      console.log(values);

      return snapshot.val();

    });
  // return this.myResults;
  // console.log(this.myResults);
 }

}
