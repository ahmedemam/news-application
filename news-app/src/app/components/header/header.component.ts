import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LocalStorageService } from 'src/app/_core/_services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  returnUrl: string;
  constructor(private authenticationService: AuthenticationService, private router: Router, private location: Location,
    private loaderService: NgxUiLoaderService, private localStorageService: LocalStorageService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = (this.location.path() !== '/login' && this.location.path() !== 'login');
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.loaderService.start();
    this.authenticationService.logout().subscribe(status => {
      console.log(status);
      this.localStorageService.removeItem('currentUser');
      this.authenticationService.currentUser.next(null);
      this.loaderService.stop();
      this.router.navigate(['/login']);
    }, (error) => {
      console.log(error);
      this.loaderService.stop();
    });
  }

}
