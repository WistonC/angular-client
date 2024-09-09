import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterFormComponent,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,

  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
