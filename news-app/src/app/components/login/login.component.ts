import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LocalStorageService } from 'src/app/_core/_services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  returnUrl: string;

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute,
    private loaderService: NgxUiLoaderService) {
      if (this.authenticationService.currentUserValue) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
        this.router.navigate([this.returnUrl]);
      }
  }

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
        if (this.returnUrl === '/' || !this.returnUrl) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate([this.returnUrl]);
        }
        this.loaderService.stop();
      }, (error) => {
        console.log(error);
        this.loaderService.stop();
      });
    }
  }

}
