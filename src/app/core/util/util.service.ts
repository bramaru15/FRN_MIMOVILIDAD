import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";
import { PatternConstants } from '../constant/PatternConstants';



@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private static FORMAT_DATE = 'YYYY-MM-DD';

  static fechaFuturas(controlDate: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlDate);

      if (control?.errors && !control?.errors?.['mayorFecha']) {
        return;
      }

      let fecha = new Date(control?.value);

      if (fecha > new Date()) {
        control?.setErrors({ mayorFecha: true });
      }
    }

  }

  static fechaMenorYYYY(controlDate: string, controlDateF: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlDate);
      const controlF = formGroup.get(controlDateF);

      if (controlF?.errors && !controlF?.errors?.['menorAnno']) {
        return;
      }

      let fecha = new Date(control?.value);
      let today = new Date(controlF?.value);

      const unAnioEnMilisegundos = 31536000000;
      const diferenciaEnAnios = (today.getTime() - fecha.getTime()) / unAnioEnMilisegundos;

      if (diferenciaEnAnios > 1) {
        controlF?.setErrors({ menorAnno: true });
      }
    }

  }

  static tipoNumDocumento(controlTipoD: string, controlNumD: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlTipoD);
      const matchingControl = formGroup.get(controlNumD);

      if (matchingControl?.errors && !matchingControl?.errors?.['ccNumDocumento']
        && !matchingControl?.errors?.['ccNumDocumento_2']
        && !matchingControl?.errors?.['ccNumDocumento_22']
        && !matchingControl?.errors?.['docNum10_11']
        && !matchingControl?.errors?.['doc10_c']) {
        return;
      }
      let re = new RegExp(PatternConstants.PATTERN_ONLY_NUMBER);
      let aux = matchingControl?.value.length
      let a = control?.value

      if (a === '1') {
        //CC númerico con logitud de 6, 7, 8 o 10 dígitos
        if (re.test(matchingControl?.value) === false) {
          matchingControl?.setErrors({ ccNumDocumento: true });
        } else if (aux !== 6 && aux !== 7 && aux !== 8 && aux !== 10) {
          matchingControl?.setErrors({ ccNumDocumento: true });
        } else {
          matchingControl?.setErrors(null);
        }
      } else if (a === '7' || a === '5') {
        //Registro Civil de Nacimiento - > RC o NUIP longitud de 10 caracteres y alfanúmerico
        // o bien estrictamente númerico con logintud de 11 dígitos.
        if (aux !== 10 && aux !== 11) {
          matchingControl?.setErrors({ docNum10_11: true });
        } else if (re.test(matchingControl?.value) === false) {
          if (aux === 11) {
            matchingControl?.setErrors({ doc10_c: true });
          }
        } else {
          matchingControl?.setErrors(null);
        }
      } else if (a === '6') {
        //TI, completamente númerico con longitud de 10 u 11 dígitos
        if (re.test(matchingControl?.value) === false) {
          matchingControl?.setErrors({ ccNumDocumento_2: true });
        } else if (aux !== 10 && aux !== 11) {
          matchingControl?.setErrors({ ccNumDocumento_2: true });
        } else {
          matchingControl?.setErrors(null);
        }
      } else if (a === '2') {
        //nit, numerico de 9 dígitos
        if (re.test(matchingControl?.value) === false) {
          matchingControl?.setErrors({ ccNumDocumento_22: true });
        } else if (aux !== 9) {
          matchingControl?.setErrors({ ccNumDocumento_22: true });
        } else {
          matchingControl?.setErrors(null);
        }
      }
    };
  }

  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors?.['mustMatch']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  static mustMatchIdentificacion(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors?.['mustMatchIdentificacion']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatchIdentificacion: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  static mustMatchContrasena(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors?.['mustMatchContrasena']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatchContrasena: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  static mustMatchCorreo(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors?.['mustMatchCorreo']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatchCorreo: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  static mustMatchTelf(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors?.['mustMatchTelf']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatchTelf: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  static differentThan(controlName: string, value: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);

      if (control?.errors) {
        return;
      }

      return control?.value === value ? { required: true } : null;
    };
  }

  static matchList(matchingList: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (control.value == null) {
        return null;
      }

      if (matchingList.find(value => value.codigo === control.value)) {
        return null;
      } else {
        return { matchList: true };
      }
    };
  }

  static dateMax(date: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value, this.FORMAT_DATE);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isBefore(validationDate) ? null : {
        'dateMaximum': {
          'maxDate': validationDate.format(this.FORMAT_DATE),
          'actual': controlDate.format(this.FORMAT_DATE)
        }
      };
    };
  }

  static dateMin(date: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value, this.FORMAT_DATE);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isAfter(validationDate) ? null : {
        'dateMinimum': {
          'minDate': validationDate.format(this.FORMAT_DATE),
          'actual': controlDate.format(this.FORMAT_DATE)
        }
      };
    };
  }

  static clean(obj: any) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Campo obligatorio',
      'min': 'Valor mínimo ' + validatorValue.min,
      'max': 'Valor máximo ' + validatorValue.max,
      'minlength': 'Longitud mínima ' + validatorValue.requiredLength + ' caracteres',
      'maxlength': 'Longitud máxima ' + validatorValue.requiredLength + ' caracteres',
      'email': 'Formato correo inválido',
      'patternCellError': 'El dato ingresado debe ser numérico',
      'patternTelError': 'El dato ingresado debe ser numérico',
      'patternNumberError': 'El dato ingresado debe ser numérico',
      'patternEmailError': 'El formato de correo electrónico es inválido',
      'patternPassword': 'Debe contener mayúsculas, minúsculas, símbolos y números',
      'patternDate': 'Formato invalido AAAA-MM-DD',
      'formatError': 'El formato ingresado es invalido',
      'matchList': 'El valor escrito no se encuentra en la lista',
      'mustMatch': 'El valor no coincide',
      'dateMaximum': 'La fecha debe ser menor a la ' + validatorValue.maxDate,
      'dateMinimum': 'La fecha debe ser mayor a ' + validatorValue.minDate,
      'ccNumDocumento': 'Númerico con logitud de 6, 7, 8 o 10 dígitos',
      'docNum10_11': 'Logitud de 10 o 11 dígitos',
      'doc10_c': 'Númerico con logintud de 11 dígitos',
      'ccNumDocumento_2': 'Númerico con longitud de 10 u 11 dígitos',
      'ccNumDocumento_22': 'Númerico con longitud de 9 dígitos',
      'mayorFecha': 'Fecha inválida. No se permiten fechas futuras',
      'menorAnno': 'Fecha inválida. No se permite que el rango de fecha supere un año',
      'mustMatchTelf': 'Celular no coincide',
      'mustMatchCorreo': 'Correo no coincide',
      'mustMatchContrasena': 'Contraseña no coincide',
      'mustMatchIdentificacion': 'Identificación no coincide',
    };
    let jsonAux = JSON.stringify(config, [validatorName]);

    let json2 = JSON.parse(jsonAux);
    let configname = ""
    for (var key in json2) {
      configname = json2[key];
    }


    return configname;
  }

  static getValidatorErrorMessageEn(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Obligatory field',
      'min': 'Minimum value ' + validatorValue.min,
      'max': 'Valor máximo ' + validatorValue.max,
      'minlength': 'Longitud mínima ' + validatorValue.requiredLength + ' caracteres',
      'maxlength': 'Longitud máxima ' + validatorValue.requiredLength + ' caracteres',
      'email': 'Formato correo inválido',
      'patternCellError': 'El dato ingresado debe ser numérico',
      'patternTelError': 'El dato ingresado debe ser numérico',
      'patternNumberError': 'El dato ingresado debe ser numérico',
      'patternEmailError': 'El formato de correo electrónico es inválido',
      'patternPassword': 'Debe contener mayúsculas, minúsculas, símbolos y números',
      'patternDate': 'Formato invalido AAAA-MM-DD',
      'formatError': 'El formato ingresado es invalido',
      'matchList': 'El valor escrito no se encuentra en la lista',
      'mustMatch': 'El valor no coincide',
      'dateMaximum': 'La fecha debe ser menor a la ' + validatorValue.maxDate,
      'dateMinimum': 'La fecha debe ser mayor a ' + validatorValue.minDate,
      'ccNumDocumento': 'Númerico con logitud de 6, 7, 8 o 10 dígitos',
      'docNum10_11': 'Logitud de 10 o 11 dígitos',
      'doc10_c': 'Númerico con logintud de 11 dígitos',
      'ccNumDocumento_2': 'Númerico con longitud de 10 u 11 dígitos',
      'ccNumDocumento_22': 'Númerico con longitud de 9 dígitos',
      'mayorFecha': 'Fecha inválida. No se permiten fechas futuras',
      'menorAnno': 'Fecha inválida. No se permite que el rango de fecha supere un año',
      'mustMatchTelf': 'Celular no coincide',
      'mustMatchCorreo': 'Correo no coincide',
      'mustMatchContrasena': 'Contraseña no coincide',
      'mustMatchIdentificacion': 'Identificación no coincide',
    };
    let jsonAux = JSON.stringify(config, [validatorName]);

    let json2 = JSON.parse(jsonAux);
    let configname = ""
    for (var key in json2) {
      configname = json2[key];
    }


    return configname;
  }

  static getTipoIdentificacion(idTipoIdentifciacion: string) {
    switch (idTipoIdentifciacion) {
      case '1': return 'CC';
      case '2': return 'NIT';
      case '3': return 'PS';
      case '4': return 'TI';
      case '5': return 'CE';
      case '6': return 'RC';
      case '7': return 'NUIP';
      case '8': return 'CD';
      case '9': return 'TE';
      case '11': return 'PPT';
      default: return idTipoIdentifciacion;
    }
  }

  static getTipoIdentificacionDescripcion(idTipoIdentifciacion: string) {
    switch (parseInt(idTipoIdentifciacion, 0)) {
      case 1: return 'Cédula de ciudadanía';
      case 2: return 'NIT';
      case 3: return 'Pasaporte';
      case 4: return 'Tarjeta de identidad';
      case 5: return 'Cédula de extranjería';
      case 6: return 'Registro civil';
      case 7: return 'NUIP';
      case 8: return 'Carnet Diplomatico';
      case 9: return 'Tarjeta Extranjeria';
      case 11: return 'Permiso de Permanencia Temporal';
      default: return idTipoIdentifciacion;
    }
  }

  static getInvalidControls(form: FormGroup): string[] {
    const invalid: string[] = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
