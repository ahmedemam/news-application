import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoaderConfiguration } from './src/app/core/config/loader-configuration';
import { LoginComponent } from './src/app/components/login/login.component';
import { RegisterComponent } from './src/app/components/register/register.component';
import { ErrorComponent } from './src/app/components/error/error.component';
import { NewsComponent } from './src/app/components/news/news.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(LoaderConfiguration.configuration)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
