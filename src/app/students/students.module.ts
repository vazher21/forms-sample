import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormGeneralComponent } from './components/user-form/student-form-general/student-form-general.component';
import { StudentFormAddressComponent } from './components/user-form/student-form-address/student-form-address.component';
import { StudentFormGradesComponent } from './components/user-form/student-form-grades/student-form-grades.component';

@NgModule({
  declarations: [StudentsComponent, UserFormComponent, StudentsListComponent, StudentFormGeneralComponent, StudentFormAddressComponent, StudentFormGradesComponent],
  imports: [ReactiveFormsModule, SharedModule],
  exports: [StudentsComponent],
})
export class StudentsModule {}
