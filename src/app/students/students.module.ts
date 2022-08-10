import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { StudentFormComponent } from './components/user-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormGeneralComponent } from './components/user-form/student-form-general/student-form-general.component';
import { StudentFormAddressComponent } from './components/user-form/student-form-address/student-form-address.component';
import { StudentFormGradesComponent } from './components/user-form/student-form-grades/student-form-grades.component';
import { StepperModule } from '../shared/modules/stepper/stepper.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentsListComponent,
    StudentFormGeneralComponent,
    StudentFormAddressComponent,
    StudentFormGradesComponent,
  ],
  imports: [ReactiveFormsModule, SharedModule, StepperModule],
  exports: [StudentsComponent],
})
export class StudentsModule {}
