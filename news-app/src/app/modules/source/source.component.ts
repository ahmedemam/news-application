import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Source } from 'src/app/_core/_models/source';
import { CategoryEnum } from 'src/app/_core/_models/category-enum.enum';
import { CountryEnum } from 'src/app/_core/_models/country-enum.enum';
import { LanguageEnum } from 'src/app/_core/_models/language-enum.enum';
import { Sources } from 'src/app/_core/_models/sources';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';
import { SourceService } from 'src/app/_core/_services/source.service';
import { User } from 'src/app/_core/_models/user';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {
  resources: Source[] = [];
  currentUser: User;
  public CategoryEnum = CategoryEnum;
  public CountryEnum = CountryEnum;
  public LanguageEnum = LanguageEnum;
  subscribedSources = [];
  subscribedCountries = [];
  subscribedLanguages = [];
  subscribedCategories = [];
  sources: Sources = null;
  constructor(private http: HttpClient, private loaderService: NgxUiLoaderService,
    private authenticationServie: AuthenticationService, private sourceService: SourceService) {
    this.currentUser = this.authenticationServie.currentUserValue;
    if (this.currentUser) {
      this.subscribedSources = this.currentUser.sources;
    }
  }

  ngOnInit() {
    this.getAllSources();
  }


  getAllSources() {
    this.loaderService.start();
    this.sourceService.getAllSources(this.currentUser._id).subscribe((resources: any) => {
      console.log(resources);
      this.resources = resources.sources;
      this.loaderService.stop();
    }, (error) => {
      this.loaderService.stop();
      console.log(error);
    });
  }

  subscribeOrUnsubscribeSource(sourceId) {
    if (sourceId && this.isSourceSubscribed(sourceId, this.subscribedSources)) {
      this.subscribedSources = this.subscribedSources.filter(c => c !== sourceId);
    } else {
      this.subscribedSources = [...this.subscribedSources, sourceId];
    }
  }

  // NEWS API NOT SUPPORTED
  subscribeOrUnsubscribeCategory(category) {
    if (category && this.isSourceSubscribed(category, this.subscribedCategories)) {
      this.subscribedCategories = this.subscribedCategories.filter(c => c !== category);
    } else {
      this.subscribedCategories = [...this.subscribedCategories, category];
    }
  }

  // NEWS API NOT SUPPORTED
  subscribeOrUnsubscribeCountry(country) {
    if (country && this.isSourceSubscribed(country, this.subscribedCountries)) {
      this.subscribedCountries = this.subscribedCountries.filter(c => c !== country);
    } else {
      this.subscribedCountries = [...this.subscribedCountries, country];
    }
  }

  // NEWS API NOT SUPPORTED
  subscribeOrUnsubscribeLanguage(language) {
    if (language && this.isSourceSubscribed(language, this.subscribedLanguages)) {
      this.subscribedLanguages = this.subscribedLanguages.filter(l => l !== language);
    } else {
      this.subscribedLanguages = [...this.subscribedLanguages, language];
    }
  }

  saveSubscriptionChanges() {
    this.currentUser.sources = this.subscribedSources;
    this.loaderService.start();
    this.authenticationServie.editUser(this.currentUser).subscribe((updatedUser) => {
      this.authenticationServie.updateUserData(updatedUser);
      this.loaderService.stop();
    }, (error) => {
      console.log(error);
      this.loaderService.stop();
    });
  }

  isSourceSubscribed(element, array) {
    return array.indexOf(element) === -1 ? false : true;
  }

}
