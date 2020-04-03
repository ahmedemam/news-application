import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router, private loaderService: NgxUiLoaderService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)]))
    });
  }

  onSubmit(loginForm: FormGroup) {
    if (loginForm.valid) {
      const loginCredentials = this.loginForm.value;
      this.loaderService.start();
      this.authenticationService.login(loginCredentials).subscribe(loginedUser => {
        console.log(loginedUser);
        this.loaderService.stop();
      }, (error) => {
        console.log(error);
        this.loaderService.stop();
      });
    }
  }

}
