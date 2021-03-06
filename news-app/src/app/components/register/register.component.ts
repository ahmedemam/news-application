import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/_core/_models/user';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_core/_services/authentication.service';
import { LocalStorageService } from 'src/app/_core/_services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  returnUrl: string;
  constructor(private loaderService: NgxUiLoaderService, private authenticationService: AuthenticationService,
    private router: Router, private localStorageService: LocalStorageService, private route: ActivatedRoute) {

      if (this.authenticationService.currentUserValue) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
        this.router.navigate([this.returnUrl]);
      }
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)]))
    });
  }

  onSubmit(registerForm: FormGroup) {
    if (registerForm.valid) {
      const user = this.registerForm.value;
      this.loaderService.start();
      this.authenticationService.register(user).subscribe((registeredUser) => {
        this.loaderService.stop();
        this.router.navigate(['/login']);
      }, (error) => {
        console.log(error);
        this.loaderService.stop();
      });
    }
  }


}
