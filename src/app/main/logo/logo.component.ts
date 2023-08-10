import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.sass']
})
export class LogoComponent {
  constructor(private router: Router, private ngxSpinner: NgxSpinnerService,){
    this.ngxSpinner.show();
    var that = this;
    setTimeout(function(){
      that.ngxSpinner.hide();
      that.router.navigateByUrl("/pages/landing-page");
    },1700);
  }
}
