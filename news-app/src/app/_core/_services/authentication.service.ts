import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: BehaviorSubject<User> = null;
  constructor(
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService) { }



  getAll() {
    return this.httpClient.get<User[]>(`/users`);
  }

  getById(id: number) {
    return this.httpClient.get(`${environment.BACKEND_SERVICE}/users/${id}`);
  }

  login(loginCredentials: any) {
    return this.httpClient.post(`${environment.BACKEND_SERVICE}/users/authentication`, loginCredentials);
  }

  public isAuthenticated(): boolean {
    const token = this.localStorageService.getItem('token').getValue();
    return !this.jwtHelperService.isTokenExpired(token);
  }

  public get currentUserValue(): User {
    return this.currentUser.value;
  }

  register(newUser: any) {
    return this.httpClient.post(`${environment.BACKEND_SERVICE}/users/register`, newUser);
  }

  update(user: User) {
    return this.httpClient.put(`${environment.BACKEND_SERVICE}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.BACKEND_SERVICE}/users/${id}`);
  }

  logout() {
    const user = this.currentUserValue;
    return this.httpClient.post(`${environment.BACKEND_SERVICE}/users/logout`, user);
  }
}
