import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = ! (/[A-Z]\d[A-Z]\s\d[A-Z]\d/i.test(control.value));
    return invalid ? { postalCodeInvalid: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PostalCodeValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class PostalCodeValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName
      ? postalCodeValidator()(control)
      : null;
  }
}
