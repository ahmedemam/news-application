import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isAuthenticated = true;
    // this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

}
