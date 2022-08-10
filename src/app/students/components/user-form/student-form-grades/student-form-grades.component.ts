import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { STUDENTS_GRADES } from '../../../constants/students-grades';
import { BaseStepComponent } from '../../../../shared/models/base-step-component';
import { StudentFormGradesService } from './student-form-grades.service';

@Component({
  selector: 'app-student-form-grades',
  templateUrl: './student-form-grades.component.html',
  styleUrls: ['../../../styles/_form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormGradesComponent extends BaseStepComponent {
  form = this.studentFormGradesService.form;
  showScienceControl$ = this.studentFormGradesService.showScienceControl$;
  gradesCatalog: string[] = STUDENTS_GRADES;

  constructor(
    private studentFormGradesService: StudentFormGradesService,
    private cdr: ChangeDetectorRef
  ) {
    super(studentFormGradesService, cdr);
  }

  get math() {
    return this.studentFormGradesService.math;
  }
  get science() {
    return this.studentFormGradesService.science;
  }
  get history() {
    return this.studentFormGradesService.history;
  }
  get arts() {
    return this.studentFormGradesService.arts;
  }
  get english() {
    return this.studentFormGradesService.english;
  }
}
