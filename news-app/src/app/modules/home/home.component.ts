import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';
import { Article } from 'src/app/_core/_models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  totalResults = 0;
  visibleArticlesCounter = 0;
  enableLoadMoreArticlesButton = true;
  API_KEY = '';
  constructor(private http: HttpClient, private loaderService: NgxUiLoaderService, private authenticationServie: AuthenticationService) { }

  ngOnInit() {
    this.getAllArticles();
  }


  getAllArticles() {
    this.loaderService.start();
    this.http.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=8fcef351de914f59b2797dadf86d4908').subscribe((articles: any) => {
      this.articles = articles.articles;
      this.totalResults = articles.totalResults;
      if (this.totalResults >= 3) {
        this.visibleArticlesCounter = 3;
      } else {
        this.visibleArticlesCounter = this.totalResults;
        this.enableLoadMoreArticlesButton = false;
      }
      this.loaderService.stop();
    }, (error) => {
      this.loaderService.stop();
    });
  }

  getMoreArticles() {
    if (this.visibleArticlesCounter >= this.totalResults) {
      this.enableLoadMoreArticlesButton = false;
    } else {
      this.visibleArticlesCounter += 3;
    }
  }

}
