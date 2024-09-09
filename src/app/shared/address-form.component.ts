import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, TranslateModule
  ],
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;  // Accept the parent form group
  @Input() cities: string[] = [];   // Cities list passed from parent
  @Output() addressFormReady = new EventEmitter<FormGroup>();  // Emit the form group to the parent

  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the address form group
    this.addressForm = this.fb.group({
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Z]\d[A-Z]\s\d[A-Z]\d$/)]]
    });

    // Emit the address form group to the parent
    this.addressFormReady.emit(this.addressForm);

    // Add the address form group to the parent form if it exists
    if (this.parentForm) {
      this.parentForm.addControl('address', this.addressForm);
    }
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
}
