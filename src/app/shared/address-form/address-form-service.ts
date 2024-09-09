import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {postalCodeValidator} from "./verify-postal-code.directive";
// import {AddressForm} from "./address-form";
import {Address} from "./address";

@Injectable({
  providedIn: 'root'
})
export class AddressFormService {

  constructor(private fb: FormBuilder) {
  }

  static createAddressFormGroup(addressForm: FormGroup, address: Address): FormGroup {
    addressForm = new FormGroup(
      {
        city: new FormControl(address.city, Validators.required),
        addressLine: new FormControl(address.addressLine, Validators.required),
        postalCode: new FormControl(address.postalCode, [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          postalCodeValidator(),])
      });
    return addressForm;
  }


}
