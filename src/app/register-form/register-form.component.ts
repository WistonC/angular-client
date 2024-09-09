import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressFormComponent } from '../shared/address-form.component';
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-registration-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, AddressFormComponent]
})
export class RegisterFormComponent implements OnInit {

  cities = ['Toronto', 'Markham', 'Scarborough', 'Mississauga', 'Brampton', 'Vaughan', 'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'Oshawa', 'Whitby', 'Ajax', 'Pickering', 'Milton', 'Newmarket', 'Aurora', 'Stouffville', 'King City', 'Nobleton', 'Maple', 'Thornhill', 'Woodbridge', 'Etobicoke', 'North York', 'East York', 'York', 'Downtown Toronto', 'Midtown Toronto', 'Scarborough'];
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onAddressFormReady(addressForm: FormGroup) {
    // Integrate address form controls into the parent form
    this.userForm.addControl('address', addressForm);
  }

  onSubmit() {
    console.log('Form data to be posted:', JSON.stringify(this.userForm.value, null, 2));
    if (this.userForm.valid) {
      this.registerUser(this.userForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  registerUser(userData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://localhost:8080/user/register', userData, { headers });
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

  get address() {
    return this.userForm.get('address') as FormGroup;
  }

  get addressLine() {
    return this.address?.get('addressLine');
  }

  get city() {
    return this.address?.get('city');
  }

  get postalCode() {
    return this.address?.get('postalCode');
  }
}
