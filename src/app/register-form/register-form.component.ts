import {User} from '../shared/user';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

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
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required,]),
      lastName: new FormControl(this.user.lastName, [Validators.required,]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email,]),
      city: new FormControl(this.user.city, Validators.required),
      addressLine: new FormControl(this.user.addressLine, Validators.required),
      postalCode: new FormControl(this.user.postalCode, [Validators.required, Validators.minLength(7), Validators.maxLength(7),
        Validators.pattern(/^[A-Z]\d[A-Z]\s\d[A-Z]\d$/),
      ]),
    },);

  }

  onSubmit() {
    console.log('Registering user: ' + this.userForm.value.firstName);
    console.log('Registering user: ' + this.userForm.value.city);
    const formData = this.userForm.value;
    if (this.userForm.valid) {
      this.registerUser(formData).subscribe(response => {
        console.log('Registration successful', response);
      }, error => {
        console.error('Registration failed', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
  registerUser(userData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://localhost:8080/user/register', userData);
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


