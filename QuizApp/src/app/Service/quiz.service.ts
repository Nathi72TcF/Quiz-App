import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  database = firebase.database();

  // getting from database
  userId;
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

  constructor() { }

  // data for category
  getcat() {
  const data = firebase.database().ref().child('categories');
  data.on('child_added', snap => {
    this.name = snap.child('catName').val();
    console.log(this.name);
    this.id = snap.child('ID').val();
    console.log(this.id);
    // console.log('Heres your key: ' + key);
    this.myCategory.push({
    ID: this.id,
    categories: this.name,
  });
    console.log(this.myCategory);
    // console.log(this.myCategory + ' ' + key);
    });
    return this.myCategory;
  }

  getID(cat) {
    this.userId = cat.ID;
  }

  Return_ID() {
    return this.userId;
  }

  // Quiz TS Code
  firebaseQuiz(ID) {
    const rootRef = firebase.database().ref().child('Quiz/' + ID);
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

}
