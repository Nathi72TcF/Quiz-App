import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  database = firebase.database();

  myCategories;
  Category;
  id;
  // test items
  catName;
  categorykey;

  constructor(
    public quizService: QuizService,
    ) {
      this.myCategories = this.quizService.getcat(this.categorykey);
      this.Category = this.quizService.getCategory();
    }

  ngOnInit() {
  }

  setID(cat) {
    this.quizService.getID(cat);
  }

}
