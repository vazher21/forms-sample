import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ErrorMessagesComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ErrorMessagesComponent,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
})
export class SharedModule {}
