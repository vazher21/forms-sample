import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BaseStepComponent } from '../../../../shared/models/base-step-component';
import { StudentFormGeneralService } from './student-form-general.service';

@Component({
  selector: 'app-student-form-general',
  templateUrl: './student-form-general.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormGeneralComponent extends BaseStepComponent {
  form = this.studentFormGeneralService.form;

  constructor(
    private studentFormGeneralService: StudentFormGeneralService,
    private cdr: ChangeDetectorRef
  ) {
    super(studentFormGeneralService, cdr);
  }

  get name() {
    return this.studentFormGeneralService.name;
  }
  get lastName() {
    return this.studentFormGeneralService.lastName;
  }
  get age() {
    return this.studentFormGeneralService.age;
  }
  get sex() {
    return this.studentFormGeneralService.sex;
  }
  get personalNumber() {
    return this.studentFormGeneralService.personalNumber;
  }
}
