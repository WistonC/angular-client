import {Component, Input, OnInit} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {Address} from "./address";
import {postalCodeValidator} from "./verify-postal-code.directive";

@Component({
    standalone: true,
    selector: 'app-address-form',
    templateUrl: './address-form.html',
    styleUrls: ['./address-form.component.css'],
    imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor]
})
export class AddressForm implements OnInit {
// export class AddressForm {
    cities = ['Toronto', 'Markham', 'Scarborough', 'Mississauga',
        'Brampton', 'Vaughan', 'Richmond Hill', 'Oakville', 'Burlington',];
    address = new Address();

    addressForm!: FormGroup;
    constructor(private parent: FormGroupDirective) {
    }
    ngOnInit(): void {
      this.addressForm = new FormGroup(
        {
        city: new FormControl(this.address.city, Validators.required),
        addressLine: new FormControl(this.address.addressLine, Validators.required),
        postalCode: new FormControl(this.address.postalCode, [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          postalCodeValidator(),])
      });
        this.parent.form.addControl('addressForm', this.addressForm);
    }
    onSubmit() {
    }
    get addressLine() {
      return this.addressForm.get('addressLine');
    }
    get city() {
      return this.addressForm.get('city');
    }
    get postalCode() {
      return this.addressForm.get('postalCode');
    }
    protected readonly onsubmit = onsubmit;
}
