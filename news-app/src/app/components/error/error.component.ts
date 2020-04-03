import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public state$: Observable<{ [key: string]: string }>;

  code = '500';
  message = '';
  constructor(private loaderService: NgxUiLoaderService) { }

  ngOnInit() {
      // this.loaderService.stop();
      const errorCode = window.history.state.code;
      if (parseInt(errorCode, 10) === 404) {
          this.code = '404';
          this.message = 'Page Not Found';
      } else {
          this.code = errorCode;
          this.message = 'Something went wrong';
      }
  }

}
