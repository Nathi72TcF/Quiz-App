import { QuizService } from './../Service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

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
    public loadingController: LoadingController
    ) {
      // this.myCategories = this.quizService.getcat();
      // this.Category = this.quizService.getcat();
    }

  ngOnInit() {
    this.loadData();
  }

  setID(cat) {
    this.quizService.getID(cat);
  }

  async loadData() {
    const loader = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'loading categories...'
    });
    await loader.present();
    this.quizService.getcat().then( getcat => {
      this.Category = getcat;
      loader.dismiss();
    });
  }

}
