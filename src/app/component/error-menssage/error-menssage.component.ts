import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {PatternConstants} from "../../core/constant/PatternConstants";
import {UtilService} from "../../core/util/util.service";
import { SessionService } from 'src/app/core/service/session.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';

@Component({
  selector: 'app-error-menssage',
  templateUrl: './error-menssage.component.html',
  styleUrls: ['./error-menssage.component.sass']
})
export class ErrorMenssageComponent {
  @Input()
  control: AbstractControl | undefined;

  selectLang;

  constructor(private sessionService: SessionService){
    this.selectLang = this.sessionService.getItemInSession(SessionConstants.LOCALE);
  }

  ngDoCheck(){
    this.selectLang = this.sessionService.getItemInSession(SessionConstants.LOCALE);
  }

  get errorMessage() {
    if(this.selectLang === 'es') {
      if (this.control && this.control.errors) {
        // tslint:disable-next-line:forin
        for (const propertyName in this.control.errors) {
          if (propertyName === 'pattern') {
            if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_EMAIL) {
              return UtilService.getValidatorErrorMessage('patternEmailError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_NUMBER_CELL) {
                return UtilService.getValidatorErrorMessage('patternCellError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_NUMBER_CELL) {
              return UtilService.getValidatorErrorMessage('patternTelError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_ONLY_NUMBER) {
              return UtilService.getValidatorErrorMessage('patternNumberError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_PASSWORD) {
              return UtilService.getValidatorErrorMessage('patternPassword', this.control.errors[propertyName]);
            } else {
              return UtilService.getValidatorErrorMessage('formatError', this.control.errors[propertyName]);
            }
          }
  
          if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || (this.control.hasError(propertyName) && this.control.value != null))) {
            return UtilService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
          }
        }
      }
    } else if(this.selectLang === 'en') {
      if (this.control && this.control.errors) {
        // tslint:disable-next-line:forin
        for (const propertyName in this.control.errors) {
          if (propertyName === 'pattern') {
            if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_EMAIL) {
              return UtilService.getValidatorErrorMessageEn('patternEmailError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_NUMBER_CELL) {
                return UtilService.getValidatorErrorMessageEn('patternCellError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_NUMBER_CELL) {
              return UtilService.getValidatorErrorMessageEn('patternTelError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_ONLY_NUMBER) {
              return UtilService.getValidatorErrorMessageEn('patternNumberError', this.control.errors[propertyName]);
            } else if (this.control.errors['pattern'].requiredPattern === PatternConstants.PATTERN_PASSWORD) {
              return UtilService.getValidatorErrorMessageEn('patternPassword', this.control.errors[propertyName]);
            } else {
              return UtilService.getValidatorErrorMessageEn('formatError', this.control.errors[propertyName]);
            }
          }
  
          if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || (this.control.hasError(propertyName) && this.control.value != null))) {
            return UtilService.getValidatorErrorMessageEn(propertyName, this.control.errors[propertyName]);
          }
        }
      }
    } 
    return null; 
  }
}
