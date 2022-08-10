import { Injectable } from '@angular/core';
import { BaseStepService } from '../../../../shared/models/base-step-service';
import { IStudentGeneralForm } from '../../../models/user-form.interface';
import { IStudentGeneralInfo } from '../../../models/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { existingPinValidator } from '../../../validators/pin.validator';
import { StudentAvailabilityService } from '../../../services/student-availability.service';
import { Subject, tap } from 'rxjs';

@Injectable()
export class StudentFormGeneralService
  implements BaseStepService<IStudentGeneralInfo>
{
  form = new FormGroup<IStudentGeneralForm>({
    age: new FormControl(null, [Validators.required]),
    personalNumber: new FormControl('', {
      asyncValidators: existingPinValidator(this.studentAvailabilityService),
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    sex: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  detectChanges$ = new Subject<void>();

  constructor(private studentAvailabilityService: StudentAvailabilityService) {
    this.valueChanges();
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }
  valueChanges() {
    this.age.valueChanges
      .pipe(
        tap((age) => {
          if (age && age >= 18) {
            this.personalNumber.addValidators(Validators.required);
          } else {
            this.personalNumber.removeValidators([Validators.required]);
          }
          this.personalNumber.updateValueAndValidity();
        })
      )
      .subscribe();
  }
  fillForm(generalInfo: IStudentGeneralInfo): void {
    this.name.setValue(generalInfo.name);
    this.lastName.setValue(generalInfo.lastName);
    this.age.setValue(generalInfo.age);
    this.sex.setValue(generalInfo.sex);
    if (generalInfo.personalNumber) {
      this.personalNumber.setValue(generalInfo.personalNumber);
    }
  }

  isValid(): boolean {
    return !this.form.invalid;
  }

  readForm(): IStudentGeneralInfo {
    return this.form.getRawValue() as IStudentGeneralInfo;
  }

  get name() {
    return this.form.controls.name;
  }
  get lastName() {
    return this.form.controls.lastName;
  }
  get age() {
    return this.form.controls.age;
  }
  get sex() {
    return this.form.controls.sex;
  }
  get personalNumber() {
    return this.form.controls.personalNumber;
  }
}
