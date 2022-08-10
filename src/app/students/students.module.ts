import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentsListComponent } from './components/students-list/students-list.component';

@NgModule({
  declarations: [StudentsComponent, UserFormComponent, StudentsListComponent],
  imports: [ReactiveFormsModule, SharedModule],
  exports: [StudentsComponent],
})
export class StudentsModule {}
