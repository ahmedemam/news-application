import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Source } from 'src/app/_core/_models/source';
import { CategoryEnum } from 'src/app/_core/_models/category-enum.enum';
import { CountryEnum } from 'src/app/_core/_models/country-enum.enum';
import { LanguageEnum } from 'src/app/_core/_models/language-enum.enum';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {
  sources: Source[] = [];
  public CategoryEnum = CategoryEnum;
  public CountryEnum = CountryEnum;
  public LanguageEnum = LanguageEnum;
  subscribedSources = [];
  subscribedCountries = [];
  subscribedLanguages = [];
  subscribedCategories = [];
  constructor(private httpClient: HttpClient, private loaderService: NgxUiLoaderService) { }

  ngOnInit() {
    this.getAllSources();
  }


  getAllSources() {
    this.loaderService.start();
    this.httpClient.get('https://newsapi.org/v2/sources?apiKey=8fcef351de914f59b2797dadf86d4908').subscribe((sources: any) => {
      this.sources = sources.sources;
      this.loaderService.stop();
    }, (error) => {
      this.loaderService.stop();
      console.log(error);
    });
  }

  subscribeOrUnsubscribeSource(sourceId) {
    if (sourceId && this.elementExistInArray(sourceId, this.subscribedSources)) {
      this.subscribedSources = this.subscribedSources.filter(c => c !== sourceId);
    } else {
      this.subscribedSources = [...this.subscribedSources, sourceId];
    }
  }

  subscribeOrUnsubscribeCategory(category) {
    if (category && this.elementExistInArray(category, this.subscribedCategories)) {
      this.subscribedCategories = this.subscribedCategories.filter(c => c !== category);
    } else {
      this.subscribedCategories = [...this.subscribedCategories, category];
    }
  }

  subscribeOrUnsubscribeCountry(country) {
    if (country && this.elementExistInArray(country, this.subscribedCountries)) {
      this.subscribedCountries = this.subscribedCountries.filter(c => c !== country);
    } else {
      this.subscribedCountries = [...this.subscribedCountries, country];
    }
  }

  subscribeOrUnsubscribeLanguage(language) {
    if (language && this.elementExistInArray(language, this.subscribedLanguages)) {
      this.subscribedLanguages = this.subscribedLanguages.filter(l => l !== language);
    } else {
      this.subscribedLanguages = [...this.subscribedLanguages, language];
    }
  }

  saveSubscriptionChanges(){
    console.log(this.subscribedCategories, this.subscribedCountries, this.subscribedLanguages, this.subscribedSources);
  }

  private elementExistInArray(element, array) {
    return array.indexOf(element) === -1 ? false : true;
  }

}
