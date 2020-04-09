import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
        private router: Router, private loacalStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
        this.authenticationService.currentUser.next(null);
        this.loacalStorageService.removeItem('currentUser');
        this.router.navigate(['login']);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
