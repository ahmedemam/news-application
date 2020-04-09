import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';
import { Article } from 'src/app/_core/_models/article';
import { SourceService } from 'src/app/_core/_services/source.service';
import { User } from 'src/app/_core/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  articles: Article[] = [];
  totalResults = 0;
  visibleArticlesCounter = 0;
  enableLoadMoreArticlesButton = true;
  constructor(private loaderService: NgxUiLoaderService,
    private authenticationServie: AuthenticationService, private sourceService: SourceService) {
    this.currentUser = this.authenticationServie.currentUserValue;
  }

  ngOnInit() {
    this.getAllArticles();
  }


  getAllArticles() {
    if (this.currentUser) {
      this.loaderService.start();
      this.sourceService.getAllArticles(this.currentUser._id).subscribe((articles: any) => {
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
  }

  getMoreArticles() {
    if (this.visibleArticlesCounter >= this.totalResults) {
      this.enableLoadMoreArticlesButton = false;
    } else {
      this.visibleArticlesCounter += 3;
    }
  }

}
