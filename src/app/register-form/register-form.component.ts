import {User} from '../user';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {identityRevealedValidator} from '../shared/identity-revealed.directive';
import {postalCodeValidator} from "../shared/address-form/verify-postal-code.directive";

@Component({
  standalone: true,
  selector: 'app-registration-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor]
})
export class RegisterFormComponent implements OnInit {

  user = new User();
  cities = ['Toronto', 'Markham', 'Scarborough', 'Mississauga', 'Brampton', 'Vaughan', 'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'Oshawa', 'Whitby', 'Ajax', 'Pickering', 'Milton', 'Newmarket', 'Aurora', 'Stouffville', 'King City', 'Nobleton', 'Maple', 'Thornhill', 'Woodbridge', 'Etobicoke', 'North York', 'East York', 'York', 'Downtown Toronto', 'Midtown Toronto', 'Scarborough'];
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required,]),
      lastName: new FormControl(this.user.lastName, [Validators.required,]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email,]),
      city: new FormControl(this.user.city, Validators.required),
      addressLine: new FormControl(this.user.addressLine, Validators.required),
      postalCode: new FormControl(this.user.postalCode, [Validators.required, Validators.minLength(7), Validators.maxLength(7), postalCodeValidator(),]),
    }, {validators: identityRevealedValidator},);

  }

  onSubmit() {
    console.log('Registering user: ' + this.userForm.value);
    console.log('Registering user: ' + this.userForm.value.firstName);
    // this.http.post('http://localhost:8080/api/v1/users', this.userForm.value).subscribe()
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get addressLine() {
    return this.userForm.get('addressLine');
  }

  get city() {
    return this.userForm.get('city');
  }

  get postalCode() {
    return this.userForm.get('postalCode');
  }

  protected readonly onsubmit = onsubmit;
}


