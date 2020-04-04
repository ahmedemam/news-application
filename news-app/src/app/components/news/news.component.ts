import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/_core/_models/article';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private $article: Article;
  @Input() set article(value) {
    if (value) {
      this.$article = value;
    }
  }
  get article() {
    return this.$article;
  }

  constructor() { }

  ngOnInit() {
  }

}
