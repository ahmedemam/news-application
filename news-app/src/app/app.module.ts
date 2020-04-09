import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoaderConfiguration } from './_core/_config/loader-configuration';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { HomeModule } from './modules/home/home.module';
import { JwtInterceptor } from './_core/_interceptors/jwt-http-interceptor';
import { HttpErrorInterceptor } from './_core/_interceptors/http-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(LoaderConfiguration.configuration),
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule,
    HomeModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
