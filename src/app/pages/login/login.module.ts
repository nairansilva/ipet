import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importe o FormsModule
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserModule],
  exports: [LoginComponent],
  declarations: [LoginComponent],
})
export class LoginModule {}
