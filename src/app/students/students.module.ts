import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentsListComponent } from './components/students-list/students-list.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentsListComponent,
  ],
  imports: [ReactiveFormsModule, SharedModule],
  exports: [StudentsComponent],
})
export class StudentsModule {}
