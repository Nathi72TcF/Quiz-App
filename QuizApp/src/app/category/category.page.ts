import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  Category;
  id;
  // test items
  catName;
  categorykey;

  constructor(
    public quizService: QuizService,
    ) {
      // this.myCategories = this.quizService.getcat();
      this.Category = this.quizService.getcat();
    }

  ngOnInit() {
  }

  setID(cat) {
    this.quizService.getID(cat);
  }

}
