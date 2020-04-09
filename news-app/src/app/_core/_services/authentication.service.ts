import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private loacalStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService) {
    this.currentUser = this.localStorageService.getItem('currentUser');
  }


  login(loginCredentials: any) {
    return this.httpClient.post(`${environment.BACKEND_SERVICE}/auth/login`, loginCredentials).pipe(map((user: User) => {
      if (user && user.access_token) {
        this.loacalStorageService.setItem('currentUser', user);
        this.currentUser.next(user);
      }
      return user;
    }));
  }

  public isAuthenticated(): boolean {
    const token = this.currentUserValue.access_token;
    return !this.jwtHelperService.isTokenExpired(token);
  }

  public get currentUserValue(): User {
    return this.currentUser.value;
  }

  public updateUserData(updatedUser: User){
    this.loacalStorageService.setItem('currentUser', updatedUser);
    this.currentUser.next(updatedUser);
  }

  register(newUser: any) {
    return this.httpClient.post(`${environment.BACKEND_SERVICE}/auth/register`, newUser);
  }

  editUser(user: User) {
    return this.httpClient.put<User>(`${environment.BACKEND_SERVICE}/user/${user._id}/update`, user);
  }

  logout() {
    const user = this.currentUserValue;
    return this.httpClient.post(`${environment.BACKEND_SERVICE}/auth/logout`, user);
  }
}
