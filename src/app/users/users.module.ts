import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UserFormComponent],
  imports: [ReactiveFormsModule, SharedModule],
  exports: [UsersComponent],
})
export class UsersModule {}
