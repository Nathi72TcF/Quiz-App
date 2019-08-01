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
  Question = [];
  question;
  categorykey;
  QuizID;
  IDs;
  answer;
  Answers = [];
  Counter = 0;

  // data from category database
  myCategory = [];

  constructor() { }

  // data for category
  getcat(categorykey) {
  const data = firebase.database().ref().child('categories');
  data.on('child_added', snap => {
    this.name = snap.child('catName').val();
    console.log(this.name);
    this.id = snap.child('ID').val();
    console.log(this.id);
    const key = snap.key;
    console.log('Heres your key: ' + key);
    this.myCategory.push({
    ID: this.id,
    categories: this.name,
    keys: key
  });
    console.log(this.myCategory);
    // console.log(this.myCategory + ' ' + key);
    });
  }

  getID(cat) {
    this.userId = cat.ID;
  }
  Return_ID() {
    return this.userId;
  }

  getCategory() {
    return this.myCategory;
  }

}

// //////// old code
    // const rootRef = firebase.database().ref().child('Quiz/').orderByChild('cat_001').equalTo('cat_001').on('value', (snapshot) => {
    //   snapshot.forEach((child) => {
    //     const data1 = child.val();
    //     console.log(data1.cat_001 + ' ' + data1.cat_002 + ' ' + data1.cat_003);
    //   });
    // }, (error) => {
    //   console.log(error);
    // }
    // );
    // console.log(rootRef);

    // ////// old code (down)

    // this.Question.push(question);
    //     console.log(this.Question);
    //     this.Option.push(childData);
    //     console.log(childData);
    //   });
    //   console.log(this.Question);
    //   this.Option.forEach((datas) => {
    //     console.log(datas);
    //     console.log(Option);
    //   });
    //   console.log(this.Question);
    // });
