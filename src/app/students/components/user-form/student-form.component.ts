import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IStudentAddressForm,
  IStudentAddressFullForm,
  IStudentForm,
  IStudentGeneralForm,
  IStudentGradesForm,
} from '../../models/user-form.interface';
import {
  IStudent,
  IStudentGeneralInfo,
  IStudentGrades,
  IStudentGradesInfo,
} from '../../models/user.interface';
import { StudentAvailabilityService } from '../../services/student-availability.service';
import { existingPinValidator } from '../../validators/pin.validator';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AddressTranslateService } from '../../../shared/services/address-translate.service';
import { GradeActivityLoggerService } from '../../services/grade-activity-logger.service';
import { areAddressesEqual } from '../../../shared/helpers/address.helper';
import { STUDENTS_GRADES } from '../../constants/students-grades';
import { Nullable } from '../../../shared/models/nullable.type';
import { StudentFormAddressService } from './student-form-address/student-form-address.service';
import { StudentFormGeneralService } from './student-form-general/student-form-general.service';
import { StudentFormGradesService } from './student-form-grades/student-form-grades.service';
import { BaseStepService } from '../../../shared/models/base-step-service';
import { IStep } from '../../../shared/modules/stepper/models/step.interface';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StudentFormAddressService,
    StudentFormGeneralService,
    StudentFormGradesService,
  ],
})
export class StudentFormComponent {
  public _chosenStudent: IStudent | null = null;
  public currentStep = 0;
  @Input() set chosenStudent(student: IStudent | null) {
    setTimeout(() => {
      this._chosenStudent = student;
      if (this._chosenStudent) {
        this.fillForm(this._chosenStudent);
      }
    });
  }
  @Output() onCancel = new EventEmitter<void>();
  @Output() register = new EventEmitter<IStudent>();
  @Output() update = new EventEmitter<IStudent>();

  // @ts-ignore
  private indexToService: Map<number, BaseStepService<any>> = new Map([
    [0, this.studentFormGeneralService],
    [1, this.studentFormAddressService],
    [2, this.studentFormGradesService],
  ]);

  public steps: IStep[] = [
    { index: 0, label: 'General' },
    { index: 1, label: 'Address' },
    { index: 2, label: 'Grades' },
  ];

  constructor(
    private studentFormGeneralService: StudentFormGeneralService,
    private studentFormAddressService: StudentFormAddressService,
    private studentFormGradesService: StudentFormGradesService
  ) {}

  readForm(): IStudent {
    return {
      general: this.studentFormGeneralService.readForm(),
      address: this.studentFormAddressService.readForm(),
      grades: this.studentFormGradesService.readForm(),
    };
  }

  fillForm(student: IStudent): void {
    this.studentFormGeneralService.fillForm(student.general);
    this.studentFormAddressService.fillForm(student.address);
    this.studentFormGradesService.fillForm(student.grades);
  }

  onStepChange(step: IStep) {
    for (let i = 0; i < step.index; i++) {
      if (!this.indexToService.get(i)!.isValid()) {
        this.indexToService.get(i)!.markAllAsTouched();
        this.indexToService.get(i)!.detectChanges$.next();
        this.currentStep = i;
        return;
      }
    }
    this.currentStep = step.index;
  }

  onNextStep() {
    this.onStepChange(this.steps[this.currentStep + 1]);
  }

  onSubmit() {
    if (!this.indexToService.get(this.currentStep)!.isValid()) {
      this.indexToService.get(this.currentStep)!.markAllAsTouched();
      return;
    }
    const student: IStudent = { ...this._chosenStudent, ...this.readForm() };
    this._chosenStudent
      ? this.update.emit(student)
      : this.register.emit(student);
  }
}
